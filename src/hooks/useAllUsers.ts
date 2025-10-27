import { useState, useEffect, useCallback } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/integrations/firebase/client";
import { toast } from "sonner";
import { UserProfile, Video } from "@/types";
import { deleteImagesFromUrls } from "@/lib/cloudinary";

export const useAllUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const usersData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as UserProfile)
        );
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError(err);
        toast.error("فشل تحميل المستخدمين");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = refetch();
    return () => unsubscribe();
  }, [refetch]);

  const updateUser = async (userId: string, data: Partial<UserProfile>) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, data);
      toast.success("تم تحديث المستخدم بنجاح");
    } catch (err) {
      const error = err as Error;
      console.error("Error updating user:", error);
      toast.error(error.message || "فشل تحديث المستخدم");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        toast.error("المستخدم غير موجود");
        return;
      }

      const userData = userDoc.data() as UserProfile;
      const userUid = userData.uid || userId;

      const imageUrls: string[] = [];
      if (userData.image?.trim()) imageUrls.push(userData.image);
      if (userData.pannerImageUrl?.trim())
        imageUrls.push(userData.pannerImageUrl);

      if (imageUrls.length > 0) {
        try {
          await deleteImagesFromUrls(imageUrls);
        } catch (imgError) {
          console.error("Error deleting images:", imgError);
        }
      }

      const videosQuery = query(
        collection(db, "videos"),
        where("userId", "==", userUid)
      );
      const videosSnapshot = await getDocs(videosQuery);

      if (!videosSnapshot.empty) {
        const deletePromises = videosSnapshot.docs.map(async (videoDoc) => {
          const videoData = videoDoc.data() as Video;

          if (videoData.storagePath && videoData.type === "uploaded") {
            try {
              const storageRef = ref(storage, videoData.storagePath);
              await deleteObject(storageRef);
            } catch (storageError) {
              console.error("Error deleting video file:", storageError);
            }
          }

          return deleteDoc(doc(db, "videos", videoDoc.id));
        });

        await Promise.all(deletePromises);
        console.log(
          `Deleted ${videosSnapshot.docs.length} video(s) for user ${userId}`
        );
      }

      await deleteDoc(userDocRef);

      const authDeleteEndpoint = import.meta.env
        .VITE_FIREBASE_AUTH_DELETE_ENDPOINT;
      if (authDeleteEndpoint) {
        try {
          const response = await fetch(authDeleteEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: userUid }),
          });

          if (response.ok) {
            const result = await response.json();
            if (!result.success) {
              console.error("Backend auth deletion failed:", result.error);
            }
          }
        } catch (backendError) {
          console.error("Backend auth deletion failed:", backendError);
        }
      }

      toast.success("تم حذف المستخدم والفيديوهات والصور المرتبطة به بنجاح");
    } catch (err) {
      const error = err as Error;
      console.error("Error deleting user:", error);
      toast.error(error.message || "فشل حذف بيانات المستخدم");
    }
  };

  return { users, loading, error, updateUser, deleteUser, refetch };
};
