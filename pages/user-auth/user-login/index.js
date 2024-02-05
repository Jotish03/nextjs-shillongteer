// pages/userLogin.js
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import NotificationContext from "@/store/notification-store";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notificationctx = useContext(NotificationContext);

  const handleUserLoginAuth = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      notificationctx.showNotification({
        title: "You are now logged in",
        description: "Redirecting to homepage...",
        variant: "blackToast",
      });
      console.log(result);
      // Update the error state properly based on the received error
      if (result?.error) {
        notificationctx.showNotification({
          title: "Error while logging in",
          description: result.error || "Error with Credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      notificationctx.showNotification({
        title: "Error",
        description: error.message || "Error has occured!",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex items-center justify-center h-[80dvh] p-8">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Admin Authenticate</CardTitle>
          <CardDescription>Login to access</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserLoginAuth}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Link href="/">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Login</Button>
            </div>
          </form>

          <div className="flex items-center justify-center mt-8">
            <Label className="font-thin text-gray-400">
              Secure Admin Login: Shillong Teer{" "}
            </Label>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default UserLogin;
