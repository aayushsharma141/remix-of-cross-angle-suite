import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteContent {
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
}

const AdminContent = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('section_key, title, subtitle, content')
      .order('section_key');

    if (data) {
      setContent(data);
    }
    setIsLoading(false);
  };

  const handleChange = (key: string, field: string, value: string) => {
    setContent(prev => 
      prev.map(item => 
        item.section_key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const item of content) {
        const { error } = await supabase
          .from('site_content')
          .update({
            title: item.title,
            subtitle: item.subtitle,
            content: item.content
          })
          .eq('section_key', item.section_key);

        if (error) throw error;
      }

      toast({
        title: "Content saved!",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error saving content",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Site Content</h1>
          <p className="text-muted-foreground mt-1">Update your website content</p>
        </div>
        <Button variant="gold" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {content.map((item, index) => (
          <motion.div
            key={item.section_key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold capitalize">
                  {item.section_key.replace('_', ' ')} Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={item.title || ''}
                      onChange={(e) => handleChange(item.section_key, 'title', e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={item.subtitle || ''}
                      onChange={(e) => handleChange(item.section_key, 'subtitle', e.target.value)}
                      placeholder="Section subtitle"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={item.content || ''}
                    onChange={(e) => handleChange(item.section_key, 'content', e.target.value)}
                    placeholder="Section content"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;