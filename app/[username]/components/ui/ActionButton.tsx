'use client'

import { motion } from 'framer-motion'
import { EditIcon, PlusIcon } from 'lucide-react'
import { EditProfileDialog } from '../../components/EditProfileDialog';
import { CreateProfileDialog } from '../../components/CreateProfileDialog';
import { UpdateOwnProfileDialog } from '../../components/UpdateOwnProfileDialog';

interface ActionButtonProps {
  isOwner: boolean
  currentUser: { id: string } | undefined
  username: string
}

export function ActionButton({ isOwner, currentUser, username }: ActionButtonProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-sm p-3 w-full"
      >
        {isOwner ? (
          <EditProfileDialog username={username}>
            <button className="w-full bg-black/90 hover:bg-black text-white rounded-xl 
              py-3 px-4 flex items-center justify-center gap-2 
              transition-all duration-200 ease-out
              text-sm md:text-base font-medium
              hover:shadow-md"
            >
              <EditIcon className="h-4 w-4" />
              Edit Profile
            </button>
          </EditProfileDialog>
        ) : currentUser ? (
          <UpdateOwnProfileDialog>
            <button className="w-full bg-black/90 hover:bg-black text-white rounded-xl 
              py-3 px-4 flex items-center justify-center gap-2 
              transition-all duration-200 ease-out
              text-sm md:text-base font-medium
              hover:shadow-md"
            >
              <EditIcon className="h-4 w-4" />
              Update Your Profile
            </button>
          </UpdateOwnProfileDialog>
        ) : (
          <CreateProfileDialog>
            <button className="w-full bg-black/90 hover:bg-black text-white rounded-xl 
              py-3 px-4 flex items-center justify-center gap-2 
              transition-all duration-200 ease-out
              text-sm md:text-base font-medium
              hover:shadow-md"
            >
              <PlusIcon className="h-4 w-4" />
              Create Profile
            </button>
          </CreateProfileDialog>
        )}
      </motion.div>
    </div>
  )
}