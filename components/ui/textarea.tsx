
import * as React from "react"
import { Bold, Italic, Link } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  renderHtml?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, renderHtml = false, ...props }, ref) => {
    // If renderHtml is true, we'll create a div to display formatted HTML content
    if (renderHtml) {
      const [value, setValue] = React.useState<string>(props.value as string || "");
      const textareaRef = React.useRef<HTMLTextAreaElement>(null);
      
      // Handle textarea changes normally
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (props.onChange) {
          props.onChange(e);
        }
      };
      
      // Format text for display: bold and links
      const formatText = (text: string) => {
        if (!text) return "";
        
        // Replace **text** with <strong>text</strong>
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Replace _text_ with <em>text</em>
        formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');
        
        // Replace [text](url) with <a href="url">text</a>
        formattedText = formattedText.replace(
          /\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, 
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
        );
        
        return formattedText;
      };
      
      // Insert formatting at cursor position
      const insertFormatting = (format: 'bold' | 'italic' | 'link') => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let newText = '';
        let newCursorPos = 0;
        
        switch (format) {
          case 'bold':
            newText = textarea.value.substring(0, start) + `**${selectedText}**` + textarea.value.substring(end);
            newCursorPos = end + 4; // 4 is the length of the added characters **
            break;
          case 'italic':
            newText = textarea.value.substring(0, start) + `_${selectedText}_` + textarea.value.substring(end);
            newCursorPos = end + 2; // 2 is the length of the added characters _
            break;
          case 'link':
            if (selectedText) {
              newText = textarea.value.substring(0, start) + `[${selectedText}](https://)` + textarea.value.substring(end);
              newCursorPos = end + 10 + selectedText.length; // position after https://
            } else {
              newText = textarea.value.substring(0, start) + `[Link Text](https://)` + textarea.value.substring(end);
              newCursorPos = start + 10 + 9; // position after https://
            }
            break;
        }
        
        setValue(newText);
        if (props.onChange) {
          const event = {
            target: { value: newText }
          } as React.ChangeEvent<HTMLTextAreaElement>;
          props.onChange(event);
        }
        
        // Set focus back to textarea and position cursor
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      };
      
      return (
        <div className="space-y-2">
          {/* Formatting toolbar */}
          <div className="flex items-center space-x-1 bg-background border rounded-md p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => insertFormatting('bold')}
              type="button"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => insertFormatting('italic')}
              type="button"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => insertFormatting('link')}
              type="button"
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Textarea */}
          <textarea
            className={cn(
              "flex min-h-[120px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={(element) => {
              // Handle both refs
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref) {
                ref.current = element;
              }
              textareaRef.current = element;
            }}
            value={value}
            onChange={handleChange}
            {...props}
          />
          
          {/* Preview area */}
          {value && (
            <div className="mt-2 p-3 border rounded-md bg-gray-50">
              <div 
                className="prose prose-sm max-w-none text-sm" 
                dangerouslySetInnerHTML={{ __html: formatText(value as string) }}
              />
            </div>
          )}
        </div>
      );
    }
    
    // Regular textarea without HTML rendering
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
