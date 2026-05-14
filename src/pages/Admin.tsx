import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Save, LogOut, ArrowLeft, ChevronDown, Search, X,
  Type, AlignLeft, MousePointer, Hash, LayoutList,
  Plus, Trash2, Pencil, Star, Eye, EyeOff, BookOpen, Briefcase, Landmark,
  Upload, ImageIcon, GripVertical, Mail, Menu, LayoutDashboard, MessageSquare,
  Globe, Check, Info,
} from "lucide-react";
import { contentRegistry, sectionOrder, sectionLabels, type ContentField } from "@/lib/contentRegistry";
import { cn } from "@/lib/utils";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DashboardPanel } from "@/components/admin/DashboardPanel";
import { ContactSubmissionsPanel } from "@/components/admin/ContactSubmissionsPanel";
import { TestimonialsPanel } from "@/components/admin/TestimonialsPanel";
import { JobApplicationsPanel } from "@/components/admin/JobApplicationsPanel";