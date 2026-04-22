import type { LucideProps } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  BookOpen,
  Calendar,
  Building2,
  Church,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  CircleHelp,
  CirclePlus,
  Compass,
  CloudCog,
  Droplets,
  Edit3,
  Drama,
  Globe,
  Hand,
  HeartPulse,
  History,
  Landmark,
  Languages,
  Info,
  Lock,
  MinusCircle,
  Mountain,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  Route,
  Search,
  Sailboat,
  Star,
  Trash2,
  TriangleAlert,
  Trophy,
  UserRound,
  Users,
  TrainFront,
  Waves,
  Wind,
  X,
  Sparkles,
  Package,
  Bolt,
  Gem,
  Palette,
  Bell,
  Clock3,
} from "lucide-react";

const iconMap = {
  add: Plus,
  add_circle: CirclePlus,
  air: Wind,
  airline_seat_recline_extra: Armchair,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  back_hand: Hand,
  bell: Bell,
  book: BookOpen,
  account_balance: Landmark,
  apartment: Building2,
  calendar_today: Calendar,
  check_circle: CircleCheckBig,
  close: X,
  cloud_sync: CloudCog,
  delete: Trash2,
  edit: Edit3,
  explore: Compass,
  expand_more: ChevronDown,
  flight: Plane,
  flight_land: PlaneLanding,
  flight_takeoff: PlaneTakeoff,
  groups: Users,
  help: CircleHelp,
  history: History,
  language_french: Languages,
  landscape: Mountain,
  info: Info,
  inventory_2: Package,
  lock: Lock,
  medication: Sparkles,
  mosque: Church,
  monitor_heart: HeartPulse,
  notifications: Bell,
  palette: Palette,
  person: UserRound,
  public: Globe,
  remove_circle: MinusCircle,
  sailing: Sailboat,
  route: Route,
  schedule: Clock3,
  search: Search,
  star: Star,
  stadium: Building2,
  surfing: Waves,
  temple_buddhist: Landmark,
  theater_comedy: Drama,
  train: TrainFront,
  warning: TriangleAlert,
  waving_hand: Hand,
  water_drop: Droplets,
  military_tech: Trophy,
  chair: Armchair,
  chevron_right: ChevronRight,
  airplaneseat: Armchair,
  add_circle_outline: CirclePlus,
  token: CircleHelp,
  diamond: Gem,
  bolt: Bolt,
} as const;

export type AppIconName = keyof typeof iconMap;

type AppIconProps = LucideProps & {
  name: AppIconName;
  filled?: boolean;
};

export function AppIcon({
  name,
  filled = false,
  strokeWidth,
  ...props
}: AppIconProps) {
  const Icon = iconMap[name];

  return (
    <Icon
      aria-hidden
      focusable="false"
      strokeWidth={filled ? 2.25 : strokeWidth ?? 2}
      {...props}
    />
  );
}
