import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const UpdateDialog = () => {
  return (
    <>
       <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User&apos;s profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

           {/* Username */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="asd" className="col-span-3" />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" className="col-span-3"  />
          </div>

          {/* phone */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Phone
            </Label>
            <Input id="username" value="asd" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-blue-600 " type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};
