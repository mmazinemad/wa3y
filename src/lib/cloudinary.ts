export const extractPublicIdFromUrl = (url: string): string | null => {
  if (!url || typeof url !== "string") return null;

  try {
    if (!url.includes("cloudinary.com")) return null;

    const cloudinaryRegex =
      /res\.cloudinary\.com\/[^/]+\/[^/]+\/[^/]+\/(?:[^/]+\/)*(?:v\d+\/)?(.+)/;
    const match = url.match(cloudinaryRegex);

    if (match && match[1]) {
      let publicId = match[1];
      publicId = publicId.replace(/^v\d+\//, "");
      publicId = publicId.replace(/\.[^/.]+$/, "");
      publicId = publicId.replace(/^[a-z]_[^/]+,?/g, "");
      return publicId;
    }

    return null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export const deleteCloudinaryImage = async (
  publicId: string
): Promise<boolean> => {
  if (!publicId) return false;

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const backendEndpoint = import.meta.env.VITE_CLOUDINARY_DELETE_ENDPOINT;

    if (backendEndpoint) {
      try {
        const response = await fetch(backendEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) return true;
        }
      } catch (error) {
        console.warn("Backend deletion failed:", error);
      }
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());

    if (apiKey) {
      formData.append("api_key", apiKey);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: "POST", body: formData }
    );

    const result = await response.json();

    if (result.result === "ok" || result.result === "not found") {
      return true;
    }

    console.error(`Failed to delete image ${publicId}:`, result);
    return false;
  } catch (error) {
    console.error(`Error deleting image ${publicId}:`, error);
    return false;
  }
};

export const deleteCloudinaryImages = async (
  publicIds: string[]
): Promise<void> => {
  if (!publicIds || publicIds.length === 0) return;

  const deletePromises = publicIds
    .filter((id) => id !== null)
    .map((id) => deleteCloudinaryImage(id));

  await Promise.allSettled(deletePromises);
};

export const deleteImagesFromUrls = async (urls: string[]): Promise<void> => {
  if (!urls || urls.length === 0) return;

  const publicIds = urls
    .map((url) => extractPublicIdFromUrl(url))
    .filter((id): id is string => id !== null);

  if (publicIds.length > 0) {
    await deleteCloudinaryImages(publicIds);
  }
};
