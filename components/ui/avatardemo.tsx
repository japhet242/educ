import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarDemo({avatar}:{avatar:string | undefined}) {
    return (
      <Avatar>
        {avatar &&  <AvatarImage src={avatar} alt={avatar} />}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  