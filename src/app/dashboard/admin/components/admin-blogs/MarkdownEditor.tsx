import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';

interface MarkdownEditorProps {
    content: string;
    setContent: (content: string) => void;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({ content, setContent }) => {
    return (
        <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="md:min-h-[400px] min-h-[350px] font-mono"
        />
    );
};

export default MarkdownEditor;