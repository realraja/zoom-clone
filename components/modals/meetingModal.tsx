import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
// import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonTxt?: string;
  handleClick?: () => void;
  children?: ReactNode;
  image?: string;
  // buttonIcon?: ReactNode | LucideIcon;
  buttonIcon?: ReactNode;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonTxt = 'Confirm',
  handleClick,
  children,
  image,
  buttonIcon,
  description,
  variant = 'default',
}: MeetingModalProps) => {
  const variantStyles = {
    default: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800',
    success: 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800',
    destructive: 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden rounded-xl border-0 bg-white shadow-xl dark:bg-gray-900 max-w-md">
        {/* Header with optional image */}
        {image && (
          <div className="relative h-48 w-full">
            <Image
              src={image}
              height={32}
              width={32}
              alt="modal header"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        )}

        {/* Content Area */}
        <div className={cn(
          "space-y-6 p-6",
          image && "pt-4"
        )}>
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className={cn(
              "text-2xl font-bold text-gray-900 dark:text-white",
              className
            )}>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Children Content */}
          {children && (
            <div className="space-y-4">
              {children}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClick}
              className={cn(
                "flex-1 text-white",
                variantStyles[variant]
              )}
            >
              {buttonIcon && (
                <span className="mr-2">
                  {React.isValidElement(buttonIcon) 
                    ? React.cloneElement(buttonIcon)
                    : buttonIcon}
                </span>
              )}
              {buttonTxt}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;