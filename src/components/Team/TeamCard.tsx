
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { UserProfile } from "@/types";

interface TeamCardProps {
  member: UserProfile;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="team-card animate-fade-in">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email}`}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover shadow-primary"
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-primary p-1 rounded-full">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {member.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center space-y-3">
        <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
        
        <Badge variant="secondary" className="text-sm">
          {member.title}
        </Badge>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {member.bio || 'هذا العضو لم يقم بكتابة نبذة شخصية بعد.'}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <Link to={`/team/${member.id}`}>
            <Eye className="w-4 h-4 ml-2" />
            عرض الملف الشخصي
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TeamCard;
