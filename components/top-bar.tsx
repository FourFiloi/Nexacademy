"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, LogOut, Settings, User } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { CurrencyDisplay } from "@/components/currency-display"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const isMobile = useMobile()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-4 bg-card">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* XP Display */}
        <CurrencyDisplay type="xp" value={2450} />

        {/* Coins Display */}
        <CurrencyDisplay type="coins" value={750} />

        {/* Streak Display */}
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <Image src="/icons/streak.svg" alt="Streak" width={16} height={16} className="h-4 w-4" />
          <span className="text-xs font-medium text-foreground">3</span>
        </div>

        {/* Add the ModeToggle component here */}
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New course available: Advanced React</DropdownMenuItem>
            <DropdownMenuItem>Assignment due tomorrow</DropdownMenuItem>
            <DropdownMenuItem>You earned a new badge!</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/avatar.jpeg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
