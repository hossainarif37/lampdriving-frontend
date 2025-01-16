import { FC } from 'react';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface ITooltipButtonProps {
    icon: React.ReactNode
    tooltip: string
    onClick?: () => void
    inputFile?: boolean
    inputFileProps?: React.InputHTMLAttributes<HTMLInputElement>
}
const TooltipButton: FC<ITooltipButtonProps> = ({ icon, tooltip, onClick, inputFile, inputFileProps }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClick}
                        className={inputFile ? "relative" : ""}
                    >
                        {inputFile && (
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                {...inputFileProps}
                            />
                        )}
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-secondary text-light">{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipButton;