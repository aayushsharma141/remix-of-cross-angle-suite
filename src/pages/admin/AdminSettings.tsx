import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { changePasswordSchema } from "@/lib/auth-validation";

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmNewPassword?: string }>({});
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        if (roleData) {
          setUserRole(roleData.role);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword
    });

    if (!validation.success) {
      const fieldErrors: typeof errors = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      // First verify current password by re-authenticating
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("User not found");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        setErrors({ currentPassword: "Current password is incorrect" });
        setIsLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings</p>
      </div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="text-primary" size={24} />
          <h2 className="text-xl font-display font-semibold">Account Information</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-muted-foreground text-sm">Email Address</Label>
            <p className="font-medium mt-1">{userEmail}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Role</Label>
            <div className="flex items-center gap-2 mt-1">
              <Shield size={16} className="text-primary" />
              <p className="font-medium capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-primary" size={24} />
          <h2 className="text-xl font-display font-semibold">Change Password</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`pr-10 ${errors.currentPassword ? "border-destructive" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-destructive">{errors.currentPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`pr-10 ${errors.newPassword ? "border-destructive" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-destructive">{errors.newPassword}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Min 8 characters, at least one letter and one number
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className={`pr-10 ${errors.confirmNewPassword ? "border-destructive" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-sm text-destructive">{errors.confirmNewPassword}</p>
            )}
          </div>

          <Button type="submit" variant="gold" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
