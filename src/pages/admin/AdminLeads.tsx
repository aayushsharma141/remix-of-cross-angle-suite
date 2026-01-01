import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Tag, MessageSquare, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  category: string;
  ai_response: string | null;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-1">Manage your inquiries</p>
      </div>
      <div className="space-y-4">
        {leads.map((lead, i) => (
          <motion.div key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <Badge variant="outline" className="capitalize">{lead.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Mail size={14} />{lead.email}</span>
                      {lead.phone && <span className="flex items-center gap-1"><Phone size={14} />{lead.phone}</span>}
                      <span className="flex items-center gap-1"><Calendar size={14} />{format(new Date(lead.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                    {lead.message && <p className="text-muted-foreground text-sm mb-3">{lead.message}</p>}
                    {lead.ai_response && (
                      <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                        <p className="text-xs text-primary mb-1 flex items-center gap-1"><MessageSquare size={12} />AI Response</p>
                        <p className="text-sm text-muted-foreground">{lead.ai_response}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {leads.length === 0 && <div className="text-center py-12 text-muted-foreground">No leads yet.</div>}
      </div>
    </div>
  );
};

export default AdminLeads;