import * as React from "react";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";

import { useState } from "react";

export function CardWithForm({ email, password, onSubmit }) {
  const [tmpEmail, setTmpEmail] = useState(email);
  const [tmpPassword, setTmpPassword] = useState(password);

  const handleEmailChange = (e) => {
    setTmpEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setTmpPassword(e.target.value);
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>오픈닥터</CardTitle>
        <CardDescription>오픈닥터 솔루션 로그인</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="Email"
                type="text"
                placeholder="Email"
                value={tmpEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={tmpPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <CardFooter className="flex justify-end items-end mt-4 pb-0 px-0">
            <Button type="submit" className="border" variant="default">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
