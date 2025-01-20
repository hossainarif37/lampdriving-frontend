import { FC } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface LabeledInputProps {
    id: string
    label: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const LabeledInput: FC<LabeledInputProps> = ({ id, label, value, placeholder, onChange, className }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
            />
        </div>
    );
};

export default LabeledInput;