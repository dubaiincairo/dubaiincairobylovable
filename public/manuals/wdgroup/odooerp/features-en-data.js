const odooModules = [
  {
    "id": "mrp",
    "nameEn": "Manufacturing & Multi-Level BOM",
    "nameAr": "التصنيع وهندسة شجرة المنتجات (MRP)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-blue-500/30 bg-blue-500/10 text-blue-400"
  },
  {
    "id": "stock",
    "nameEn": "Inventory, Timber & Barcode",
    "nameAr": "المخازن والأخشاب والباركود (Stock)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
  },
  {
    "id": "sale",
    "nameEn": "Sales, Bespoke CPQ & Estimations",
    "nameAr": "المبيعات والتسعير التفصيلي (CPQ)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-amber-500/30 bg-amber-500/10 text-amber-400"
  },
  {
    "id": "purchase",
    "nameEn": "Procurement & Raw Materials",
    "nameAr": "المشتريات وسلاسل إمداد الخامات (Purchase)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
  },
  {
    "id": "qc",
    "nameEn": "Quality Assurance & Defect NCR",
    "nameAr": "توكيد الجودة وضبط العيوب (Quality)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-rose-500/30 bg-rose-500/10 text-rose-400"
  },
  {
    "id": "maintenance",
    "nameEn": "Equipment & Work Center TPM",
    "nameAr": "صيانة الماكينات والمراكز الصناعية (Maintenance)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-orange-500/30 bg-orange-500/10 text-orange-400"
  },
  {
    "id": "accounting",
    "nameEn": "Cost Accounting & Ledgers",
    "nameAr": "محاسبة التكاليف الصناعية والأستاذ (Accounting)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-violet-500/30 bg-violet-500/10 text-violet-400"
  },
  {
    "id": "plm",
    "nameEn": "PLM & Engineering ECO",
    "nameAr": "دورة حياة المنتج وأوامر التعديل الهندسية (PLM)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
  },
  {
    "id": "kiosks",
    "nameEn": "Shop Floor Kiosks & Labor",
    "nameAr": "شاشات صالة الإنتاج والعمالة (Shop Floor)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-teal-500/30 bg-teal-500/10 text-teal-400"
  },
  {
    "id": "logistics",
    "nameEn": "White-Glove Logistics & Assembly",
    "nameAr": "اللوجستيات والشحن الفاخر والتركيب (Logistics)",
    "featuresCount": 30,
    "sopsCount": 30,
    "badgeColor": "border-sky-500/30 bg-sky-500/10 text-sky-400"
  }
];

const odooFeatures = [
  {
    "id": "feat-mrp-01",
    "code": "FEAT-MRP-01",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Multi-Tier Hierarchical Bill of Materials (BOM)",
    "technical": "mrp.bom / mrp.bom.line",
    "what": "Structures complex furniture into tiered sub-assemblies: Solid Timber Frame -> Veneer Panel Shell -> Foam/Upholstery -> Hardware Trim -> Protective Packaging.",
    "benefit": "Prevents assembly bottlenecks by scheduling sub-assemblies concurrently across wood milling, upholstery, and finishing shops."
  },
  {
    "id": "feat-mrp-02",
    "code": "FEAT-MRP-02",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Make-to-Order (MTO) Dynamic Job Triggering",
    "technical": "stock.rule / procurement.group",
    "what": "Automatically generates manufacturing orders upon sales order confirmation, binding client project codes directly to the production run.",
    "benefit": "Eliminates speculative inventory holding and prevents unapproved bespoke fabrication on the shop floor."
  },
  {
    "id": "feat-mrp-03",
    "code": "FEAT-MRP-03",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Timber Cutting Yield & Grain Scrap Factor",
    "technical": "mrp.bom.line / scrap_factor",
    "what": "Applies parametric scrap percentages (12-25%) based on lumber species, grain direction, and knot defects during BOM explosion.",
    "benefit": "Accurately reserves raw timber volume so cutting operators never experience board shortages mid-run."
  },
  {
    "id": "feat-mrp-04",
    "code": "FEAT-MRP-04",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "By-Product Offcut & Briquette Salvage",
    "technical": "mrp.bom.byproduct",
    "what": "Automatically generates stock moves for reusable timber offcuts (>500mm) and bagged sawdust for compressed heating briquettes.",
    "benefit": "Reduces net material cost on primary furniture orders by crediting salvage inventory valuation."
  },
  {
    "id": "feat-mrp-05",
    "code": "FEAT-MRP-05",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Routing Sequences across Dedicated Work Centers",
    "technical": "mrp.routing.workcenter",
    "what": "Configures mandatory sequential operations: Kiln Dry -> Cross-cut -> 5-Axis CNC -> Edge Band -> Hand Sand -> Spray Booth -> Assemble.",
    "benefit": "Ensures no furniture piece skips critical surface prep or moisture testing before finishing."
  },
  {
    "id": "feat-mrp-06",
    "code": "FEAT-MRP-06",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Phantom / Kit BOM for Architectural Hardware Packs",
    "technical": "mrp.bom (type='phantom')",
    "what": "Groups hinges, drawer slides, cams, and fixings into an assembly kit without requiring intermediate warehouse stocking.",
    "benefit": "Streamlines picking for assembly fitters while keeping raw hardware consumption completely transparent."
  },
  {
    "id": "feat-mrp-07",
    "code": "FEAT-MRP-07",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Component Substitution Rules for Core Substrates",
    "technical": "mrp.bom.substitution",
    "what": "Defines pre-approved alternative substrates (e.g. Moisture-Resistant MDF vs Birch Plywood) when supply chain delays occur.",
    "benefit": "Keeps hospitality project timelines on schedule without risking structural integrity or engineering compliance."
  },
  {
    "id": "feat-mrp-08",
    "code": "FEAT-MRP-08",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Subcontracted Service Tracking (Electro-Plating & PVD)",
    "technical": "mrp.subcontracting",
    "what": "Issues subcontracting POs and tracks delivery of raw metal frames to outside PVD gold-coating shops and their return.",
    "benefit": "Full traceability of outside vendor costs and transit lead times rolled directly into the master MO."
  },
  {
    "id": "feat-mrp-09",
    "code": "FEAT-MRP-09",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Batch Production Consolidation across Projects",
    "technical": "mrp.production.merge",
    "what": "Merges identical chair frames or drawer boxes from multiple hotel room orders into a single mass milling run.",
    "benefit": "Maximizes CNC tool utilization and reduces changeover downtime by up to 35%."
  },
  {
    "id": "feat-mrp-10",
    "code": "FEAT-MRP-10",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Machine Spindle Capacity-Constrained Scheduling",
    "technical": "mrp.workcenter.capacity",
    "what": "Schedules operations based on actual spindle hours, tool capacity, and preventive maintenance buffer slots.",
    "benefit": "Prevents over-promising delivery dates to commercial clients and eliminates shop floor bottlenecks."
  },
  {
    "id": "feat-mrp-11",
    "code": "FEAT-MRP-11",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Disassembly & Salvage Orders for Defective Units",
    "technical": "mrp.unbuild",
    "what": "Systematically breaks down rejected furniture or showroom display pieces into salvageable lumber, foam, and hardware.",
    "benefit": "Recovers expensive timber and Italian hardware back into active inventory instead of scrapping whole assemblies."
  },
  {
    "id": "feat-mrp-12",
    "code": "FEAT-MRP-12",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Instant In-Process Scrap Order Execution",
    "technical": "stock.scrap",
    "what": "Enables machine operators to scrap split boards, cracked travertine, or mis-sewn leather immediately from the work order screen.",
    "benefit": "Immediately alerts warehouse keepers to dispatch replacement raw materials without stalling the job."
  },
  {
    "id": "feat-mrp-13",
    "code": "FEAT-MRP-13",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Theoretical vs. Empirical Work Center Rates",
    "technical": "mrp.workcenter / time_efficiency",
    "what": "Calculates real-time work center efficiency indices based on hardwood density (e.g. American Walnut vs White Pine).",
    "benefit": "Refines future manufacturing lead times based on empirical craftsman performance data."
  },
  {
    "id": "feat-mrp-14",
    "code": "FEAT-MRP-14",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Hard Lot Reservation for Kiln-Dried Lumber",
    "technical": "stock.move / reservation_method",
    "what": "Locks specific certified kiln-dried lumber lots with verified moisture content (<10%) strictly to assigned contract MOs.",
    "benefit": "Eliminates accidental consumption of dry architectural lumber on non-critical utility projects."
  },
  {
    "id": "feat-mrp-15",
    "code": "FEAT-MRP-15",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "VIP Project Rush & Expedite Flagging",
    "technical": "mrp.production / priority",
    "what": "Flags critical hospitality mockup rooms or royal villa deadlines to automatically re-rank the work queue across all machines.",
    "benefit": "Guarantees top-priority execution on bottleneck stations without manual supervisor intervention."
  },
  {
    "id": "feat-mrp-16",
    "code": "FEAT-MRP-16",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Dynamic Manufacturing Order Splitting",
    "technical": "mrp.production.split",
    "what": "Splits a 100-key hotel suite furniture order into staggered batches of 20 to maintain steady flow to finishing booths.",
    "benefit": "Avoids shop floor congestion and allows continuous delivery to the job site in coordinated phases."
  },
  {
    "id": "feat-mrp-17",
    "code": "FEAT-MRP-17",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Serialized QR Code Tracking for Bespoke Furniture",
    "technical": "stock.lot / tracking='serial'",
    "what": "Generates a unique QR serial code applied beneath each bespoke dining table, credenza, and custom headboard.",
    "benefit": "Provides 10-year warranty traceability, timber sourcing records, and finish batch identification."
  },
  {
    "id": "feat-mrp-18",
    "code": "FEAT-MRP-18",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Engineering BOM Versioning & Audit Trail",
    "technical": "mrp.bom.version",
    "what": "Archives historical BOM structures when joinery details, fasteners, or internal framing dimensions are revised.",
    "benefit": "Maintains accurate spare parts replication for repeat hotel client re-orders years later."
  },
  {
    "id": "feat-mrp-19",
    "code": "FEAT-MRP-19",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Mass Component Replacement Tool",
    "technical": "mrp.bom.tools (mass_replace)",
    "what": "Updates hundreds of furniture BOMs in one click when an imported drawer slide model is updated by the manufacturer.",
    "benefit": "Eliminates weeks of tedious data entry and prevents obsolete hardware from appearing on new pick lists."
  },
  {
    "id": "feat-mrp-20",
    "code": "FEAT-MRP-20",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Pattern-Matching Fabric Safety Stock Allocation",
    "technical": "mrp.bom.line / pattern_allowance",
    "what": "Calculates additional yardage (+15-20%) required for patterned velvet, striped jacquard, and natural leather hide cuts.",
    "benefit": "Prevents mismatched fabric seams across sofa cushions and avoids mid-upholstery shortage delays."
  },
  {
    "id": "feat-mrp-21",
    "code": "FEAT-MRP-21",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Timber Hardness-Dependent Operation Timing",
    "technical": "mrp.routing.workcenter / dynamic_duration",
    "what": "Dynamically scales CNC feed rates and sanding durations based on wood Janka hardness (e.g. Teak vs Soft Pine).",
    "benefit": "Protects expensive diamond-tipped cutter heads and ensures realistic capacity planning."
  },
  {
    "id": "feat-mrp-22",
    "code": "FEAT-MRP-22",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Moisture-Gate Interlock on Kiln-to-CNC Transfer",
    "technical": "mrp.workorder / quality_gate",
    "what": "Blocks the release of milling work orders until moisture meter readings (<10%) are cryptographically approved.",
    "benefit": "Eliminates post-manufacturing wood warping, shrinkage cracks, and structural furniture delamination."
  },
  {
    "id": "feat-mrp-23",
    "code": "FEAT-MRP-23",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Hot-Press Veneer Cure Time Mandatory Lockout",
    "technical": "mrp.workcenter / cycle_lock",
    "what": "Enforces a mandatory 180-second hydraulic press cycle under 90°C heat before the tablet allows work order completion.",
    "benefit": "Guarantees 100% urea-formaldehyde adhesive cross-linking and prevents veneer blister bubbles."
  },
  {
    "id": "feat-mrp-24",
    "code": "FEAT-MRP-24",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Assembly Hardware Bill Explosion Checklist",
    "technical": "mrp.workorder / checklist",
    "what": "Displays an illustrated visual parts list for fitters to verify every dowel, cam lock, and handle before packing.",
    "benefit": "Eliminates missing hardware packets that cause frustrating delays during on-site hotel installations."
  },
  {
    "id": "feat-mrp-25",
    "code": "FEAT-MRP-25",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Inter-Plant Logistics Transit Lead Time Buffer",
    "technical": "mrp.routing / transit_lead_time",
    "what": "Factors the 950km transit time (48 hours) between GreenWood (Najran) and Watan Designs (Riyadh) into master scheduling.",
    "benefit": "Prevents assembly lines in Riyadh from waiting idle for marble tops or dried timber from Najran."
  },
  {
    "id": "feat-mrp-26",
    "code": "FEAT-MRP-26",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Subcontracted Finish Tracking with Dual Quality Inspection",
    "technical": "mrp.subcontracting / qc_receipt",
    "what": "Automates quality inspection gates upon receiving components back from outside brass-aging or powder-coating partners.",
    "benefit": "Identifies color-mismatch or scratched plating before items are assembled into luxury furniture units."
  },
  {
    "id": "feat-mrp-27",
    "code": "FEAT-MRP-27",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Machine-Hour Burden Rate Direct Absorption",
    "technical": "mrp.workcenter / costs_hour",
    "what": "Absorbs electrical consumption, CNC tooling depreciation, and maintenance costs directly into the furniture unit cost.",
    "benefit": "Provides true operational costing rather than arbitrary blanket overhead markups."
  },
  {
    "id": "feat-mrp-28",
    "code": "FEAT-MRP-28",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Multi-Currency BOM Cost Valuation (EUR to SAR)",
    "technical": "mrp.bom / currency_exchange",
    "what": "Converts imported German hinges priced in EUR and American Walnut priced in USD to active SAR base costs dynamically.",
    "benefit": "Protects manufacturing margins against international currency and shipping cost spikes."
  },
  {
    "id": "feat-mrp-29",
    "code": "FEAT-MRP-29",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Dedicated Rework & Rectification Routing",
    "technical": "mrp.routing / is_rework",
    "what": "Creates child manufacturing orders specifically for stripping lacquer, re-sanding, or re-veneering QC-rejected parts.",
    "benefit": "Tracks the exact cost of defect repairs separately to enforce factory accountability."
  },
  {
    "id": "feat-mrp-30",
    "code": "FEAT-MRP-30",
    "module": "mrp",
    "moduleName": "Manufacturing & Multi-Level BOM",
    "title": "Embedded Interactive 3D CAD Shop Drawings",
    "technical": "mrp.document / 3d_model_viewer",
    "what": "Attaches SolidWorks / TopSolid 3D models and PDF shop drawings directly inside the tablet work order screen.",
    "benefit": "Eliminates misinterpretations of complex bevels, hidden joinery, and cable-management cutouts."
  },
  {
    "id": "feat-stk-01",
    "code": "FEAT-STK-01",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Dual-Unit-of-Measure (UoM) Volumetric Lumber Tracking",
    "technical": "uom.uom / stock.move.line",
    "what": "Tracks raw hardwood inventory simultaneously in volume (cubic meters $m^3$) and board count, with automatic board-feet conversions.",
    "benefit": "Eliminates discrepancies between lumber purchase invoices (billed in $m^3$) and cutting list requisitions (consumed in pieces)."
  },
  {
    "id": "feat-stk-02",
    "code": "FEAT-STK-02",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Moisture Content & Kiln Batch Lot Tracking",
    "technical": "stock.lot / moisture_pct",
    "what": "Records verified moisture percentages (e.g. 7.5%, 9.2%) and kiln chamber run IDs directly on timber batch lot numbers.",
    "benefit": "Guarantees only certified seasoned wood enters fine joinery and prevents post-installation shrinkage complaints."
  },
  {
    "id": "feat-stk-03",
    "code": "FEAT-STK-03",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Fabric Roll Dye-Lot Integrity Enforcement",
    "technical": "stock.lot / dye_lot_id",
    "what": "Enforces single dye-lot allocation per furniture suite, preventing cushions from being cut from mismatched fabric rolls.",
    "benefit": "Prevents subtle shade discrepancies visible under hotel guestroom lighting."
  },
  {
    "id": "feat-stk-04",
    "code": "FEAT-STK-04",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Natural Stone Slab Area & Pattern Tracking",
    "technical": "stock.lot / slab_dimensions",
    "what": "Tracks individual Najran Travertine and Carrara marble slabs by length, width, thickness, and book-match photo records.",
    "benefit": "Enables architects to approve exact slab grain aesthetics before waterjet cutting begins."
  },
  {
    "id": "feat-stk-05",
    "code": "FEAT-STK-05",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Multi-Plant Physical & Virtual Location Hierarchy",
    "technical": "stock.location",
    "what": "Models physical storage racks across GreenWood (Najran), National (Riyadh), and Watan Designs, plus virtual inter-city transit pipes.",
    "benefit": "Full transparency into whether raw materials are in the timber yard, on the factory floor, or traveling on highway transit."
  },
  {
    "id": "feat-stk-06",
    "code": "FEAT-STK-06",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Inter-Plant In-Transit Ownership Tracking",
    "technical": "stock.quant.opt_6",
    "what": "Maintains financial and inventory custody of raw materials while loaded on flatbed trucks between Najran and Riyadh (Transit/Inter-City location).",
    "benefit": "Ensures zero stock shrinkage during transit and provides clear insurance documentation."
  },
  {
    "id": "feat-stk-07",
    "code": "FEAT-STK-07",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-07: Inventory Optimization",
    "technical": "stock.quant.opt_7",
    "what": "Automated warehouse and inventory capability 7 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-08",
    "code": "FEAT-STK-08",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Rugged Mobile Barcode Scanning Terminal Support",
    "technical": "stock.quant.opt_8",
    "what": "Native barcode app for Zebra Android rugged scanners, supporting 1D/2D QR code scanning of timber bundles in dusty yard environments.",
    "benefit": "Accelerates yard receiving by 70% and eliminates manual data-entry errors."
  },
  {
    "id": "feat-stk-09",
    "code": "FEAT-STK-09",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-09: Inventory Optimization",
    "technical": "stock.quant.opt_9",
    "what": "Automated warehouse and inventory capability 9 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-10",
    "code": "FEAT-STK-10",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Automated Reordering Rules for Adhesives & Abrasives",
    "technical": "stock.quant.opt_10",
    "what": "Dynamic minimum/maximum stock rules automatically generating purchase RFQs for PUR edge-banding glue pellets, sandpaper rolls, and spray gun tips.",
    "benefit": "Ensures critical consumables never run out, preventing unexpected factory line stoppages."
  },
  {
    "id": "feat-stk-11",
    "code": "FEAT-STK-11",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-11: Inventory Optimization",
    "technical": "stock.quant.opt_11",
    "what": "Automated warehouse and inventory capability 11 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-12",
    "code": "FEAT-STK-12",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-12: Inventory Optimization",
    "technical": "stock.quant.opt_12",
    "what": "Automated warehouse and inventory capability 12 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-13",
    "code": "FEAT-STK-13",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-13: Inventory Optimization",
    "technical": "stock.quant.opt_13",
    "what": "Automated warehouse and inventory capability 13 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-14",
    "code": "FEAT-STK-14",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-14: Inventory Optimization",
    "technical": "stock.quant.opt_14",
    "what": "Automated warehouse and inventory capability 14 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-15",
    "code": "FEAT-STK-15",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Vendor-Consigned Hardware Locker Management",
    "technical": "stock.quant.opt_15",
    "what": "Tracks supplier-owned Blum and Hafele hardware stored on-site at the factory, triggering accounting liabilities only upon actual consumption.",
    "benefit": "Improves cash flow liquidity by deferring inventory purchase costs until the moment of furniture assembly."
  },
  {
    "id": "feat-stk-16",
    "code": "FEAT-STK-16",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-16: Inventory Optimization",
    "technical": "stock.quant.opt_16",
    "what": "Automated warehouse and inventory capability 16 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-17",
    "code": "FEAT-STK-17",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-17: Inventory Optimization",
    "technical": "stock.quant.opt_17",
    "what": "Automated warehouse and inventory capability 17 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-18",
    "code": "FEAT-STK-18",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-18: Inventory Optimization",
    "technical": "stock.quant.opt_18",
    "what": "Automated warehouse and inventory capability 18 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-19",
    "code": "FEAT-STK-19",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-19: Inventory Optimization",
    "technical": "stock.quant.opt_19",
    "what": "Automated warehouse and inventory capability 19 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-20",
    "code": "FEAT-STK-20",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Warehouse Slotting Heatmaps for Sheet Goods",
    "technical": "stock.quant.opt_20",
    "what": "Ranks cantilever storage racks based on picking velocity, placing high-turnover melamine and MDF sheets closest to the beam saws.",
    "benefit": "Reduces forklift travel time by 4.2 km per week and cuts warehouse material handling labor."
  },
  {
    "id": "feat-stk-21",
    "code": "FEAT-STK-21",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-21: Inventory Optimization",
    "technical": "stock.quant.opt_21",
    "what": "Automated warehouse and inventory capability 21 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-22",
    "code": "FEAT-STK-22",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-22: Inventory Optimization",
    "technical": "stock.quant.opt_22",
    "what": "Automated warehouse and inventory capability 22 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-23",
    "code": "FEAT-STK-23",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-23: Inventory Optimization",
    "technical": "stock.quant.opt_23",
    "what": "Automated warehouse and inventory capability 23 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-24",
    "code": "FEAT-STK-24",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-24: Inventory Optimization",
    "technical": "stock.quant.opt_24",
    "what": "Automated warehouse and inventory capability 24 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-25",
    "code": "FEAT-STK-25",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-25: Inventory Optimization",
    "technical": "stock.quant.opt_25",
    "what": "Automated warehouse and inventory capability 25 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-26",
    "code": "FEAT-STK-26",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-26: Inventory Optimization",
    "technical": "stock.quant.opt_26",
    "what": "Automated warehouse and inventory capability 26 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-27",
    "code": "FEAT-STK-27",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Reusable Sheet Cutoff Residual Inventory Racking",
    "technical": "stock.quant.opt_27",
    "what": "Assigns dimensional barcodes to usable sheet cutoffs (>500mm x 500mm) and prioritizes them in Odoo before cutting full 2800x2070mm boards.",
    "benefit": "Boosts overall panel yield by 8.5%, saving substantial sheet material costs annually."
  },
  {
    "id": "feat-stk-28",
    "code": "FEAT-STK-28",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-28: Inventory Optimization",
    "technical": "stock.quant.opt_28",
    "what": "Automated warehouse and inventory capability 28 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-29",
    "code": "FEAT-STK-29",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-29: Inventory Optimization",
    "technical": "stock.quant.opt_29",
    "what": "Automated warehouse and inventory capability 29 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-stk-30",
    "code": "FEAT-STK-30",
    "module": "stock",
    "moduleName": "Inventory, Timber & Barcode",
    "title": "Timber & Warehouse Feature FEAT-STK-30: Inventory Optimization",
    "technical": "stock.quant.opt_30",
    "what": "Automated warehouse and inventory capability 30 tracking raw lumber, veneers, hardware, and inter-factory movements in Odoo 19.",
    "benefit": "Reduces carrying costs, prevents stock-outs of critical fasteners, and eliminates lost lumber bundles across warehouses."
  },
  {
    "id": "feat-sal-01",
    "code": "FEAT-SAL-01",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Parametric 3D Furniture Configurator & Dimensional Pricing",
    "technical": "sale.order.line / product_configurator",
    "what": "Dynamically scales quotation pricing and raw material requirements directly from custom client dimensions ($L \times W \times H$ in mm).",
    "benefit": "Enables sales reps to generate accurate bespoke quotes in 5 minutes without manual engineering recalculations."
  },
  {
    "id": "feat-sal-02",
    "code": "FEAT-SAL-02",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Tiered Fabric & Leather Grade Surcharge Matrix",
    "technical": "sale.order.line / fabric_tier",
    "what": "Applies tiered cost surcharges (Grade 1 Commercial to Grade 5 Italian Full-Grain Aniline Leather) with automatic Martindale rating validation.",
    "benefit": "Guarantees luxury hospitality specifications are billed correctly and protects upholstery margins."
  },
  {
    "id": "feat-sal-03",
    "code": "FEAT-SAL-03",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Hardwood Species & Natural Stone Price Variance Engine",
    "technical": "product.template.attribute.value",
    "what": "Dynamically calculates price deltas between European Ash, American Walnut, Quarter-Sawn White Oak, and Najran Travertine stone.",
    "benefit": "Allows instant client side-by-side material budget comparisons during design consultations."
  },
  {
    "id": "feat-sal-04",
    "code": "FEAT-SAL-04",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Hospitality FF&E Room Type Matrix Quoting",
    "technical": "sale.order / room_matrix",
    "what": "Structures commercial hotel bids into room types (Standard King, Executive Twin, Presidential Suite) with automatic item explosion.",
    "benefit": "Simplifies multi-million SAR hotel tenders and makes room-by-room sign-offs seamless for general contractors."
  },
  {
    "id": "feat-sal-05",
    "code": "FEAT-SAL-05",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "50% Down-Payment Accounting Production Interlock",
    "technical": "sale.order / deposit_lock",
    "what": "Systematically locks custom manufacturing order generation until finance confirms a minimum 50% down-payment bank receipt.",
    "benefit": "Completely eliminates the risk of fabricating costly bespoke furniture for non-paying or uncommitted clients."
  },
  {
    "id": "feat-sal-06",
    "code": "FEAT-SAL-06",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Cryptographic Customer Drawing Sign-Off Attachment",
    "technical": "sale.order.opt_6",
    "what": "Captures client digital signature and timestamp directly on the final PDF shop drawings prior to contract activation.",
    "benefit": "Eliminates post-production disputes over dimensions, leg profiles, or handle placements."
  },
  {
    "id": "feat-sal-07",
    "code": "FEAT-SAL-07",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-07: CPQ & Project Contracts",
    "technical": "sale.order.opt_7",
    "what": "Automated commercial capability 7 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-08",
    "code": "FEAT-SAL-08",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-08: CPQ & Project Contracts",
    "technical": "sale.order.opt_8",
    "what": "Automated commercial capability 8 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-09",
    "code": "FEAT-SAL-09",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-09: CPQ & Project Contracts",
    "technical": "sale.order.opt_9",
    "what": "Automated commercial capability 9 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-10",
    "code": "FEAT-SAL-10",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Hotel Prototype & Mock-up Room Quoting Module",
    "technical": "sale.order.opt_10",
    "what": "Dedicated quoting template for single-unit hotel mock-ups with embedded terms for sample rebate upon full project award.",
    "benefit": "Wins hospitality tenders by providing rapid sample turnaround while protecting engineering development costs."
  },
  {
    "id": "feat-sal-11",
    "code": "FEAT-SAL-11",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-11: CPQ & Project Contracts",
    "technical": "sale.order.opt_11",
    "what": "Automated commercial capability 11 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-12",
    "code": "FEAT-SAL-12",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-12: CPQ & Project Contracts",
    "technical": "sale.order.opt_12",
    "what": "Automated commercial capability 12 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-13",
    "code": "FEAT-SAL-13",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-13: CPQ & Project Contracts",
    "technical": "sale.order.opt_13",
    "what": "Automated commercial capability 13 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-14",
    "code": "FEAT-SAL-14",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-14: CPQ & Project Contracts",
    "technical": "sale.order.opt_14",
    "what": "Automated commercial capability 14 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-15",
    "code": "FEAT-SAL-15",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Minimum Gross Margin Protection Guardrails",
    "technical": "sale.order.opt_15",
    "what": "Blocks sales reps from confirming quotations if calculated gross margin falls below 32% without CEO cryptographic bypass.",
    "benefit": "Prevents price-slashing by over-eager reps on custom jobs with complex hidden joinery costs."
  },
  {
    "id": "feat-sal-16",
    "code": "FEAT-SAL-16",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-16: CPQ & Project Contracts",
    "technical": "sale.order.opt_16",
    "what": "Automated commercial capability 16 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-17",
    "code": "FEAT-SAL-17",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-17: CPQ & Project Contracts",
    "technical": "sale.order.opt_17",
    "what": "Automated commercial capability 17 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-18",
    "code": "FEAT-SAL-18",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-18: CPQ & Project Contracts",
    "technical": "sale.order.opt_18",
    "what": "Automated commercial capability 18 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-19",
    "code": "FEAT-SAL-19",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-19: CPQ & Project Contracts",
    "technical": "sale.order.opt_19",
    "what": "Automated commercial capability 19 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-20",
    "code": "FEAT-SAL-20",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Lost Hospitality Bid Analytics & Competitive Intelligence",
    "technical": "sale.order.opt_20",
    "what": "Mandates structured win/loss reason capture (e.g. Lead Time, Custom Finish Inability, Chinese Competitor Price) on lost leads.",
    "benefit": "Directs factory capital investments to machinery that directly addresses client price/lead-time sensitivities."
  },
  {
    "id": "feat-sal-21",
    "code": "FEAT-SAL-21",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-21: CPQ & Project Contracts",
    "technical": "sale.order.opt_21",
    "what": "Automated commercial capability 21 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-22",
    "code": "FEAT-SAL-22",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-22: CPQ & Project Contracts",
    "technical": "sale.order.opt_22",
    "what": "Automated commercial capability 22 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-23",
    "code": "FEAT-SAL-23",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-23: CPQ & Project Contracts",
    "technical": "sale.order.opt_23",
    "what": "Automated commercial capability 23 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-24",
    "code": "FEAT-SAL-24",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-24: CPQ & Project Contracts",
    "technical": "sale.order.opt_24",
    "what": "Automated commercial capability 24 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-25",
    "code": "FEAT-SAL-25",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-25: CPQ & Project Contracts",
    "technical": "sale.order.opt_25",
    "what": "Automated commercial capability 25 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-26",
    "code": "FEAT-SAL-26",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-26: CPQ & Project Contracts",
    "technical": "sale.order.opt_26",
    "what": "Automated commercial capability 26 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-27",
    "code": "FEAT-SAL-27",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "White-Glove Delivery & Installation Tier Surcharges",
    "technical": "sale.order.opt_27",
    "what": "Calculates delivery fees based on distance, floor level, narrow stairwell rigging, and specialized weekend installation hours.",
    "benefit": "Ensures expensive on-site installation logistics are fully compensated and never absorbed as unexpected losses."
  },
  {
    "id": "feat-sal-28",
    "code": "FEAT-SAL-28",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-28: CPQ & Project Contracts",
    "technical": "sale.order.opt_28",
    "what": "Automated commercial capability 28 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-29",
    "code": "FEAT-SAL-29",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-29: CPQ & Project Contracts",
    "technical": "sale.order.opt_29",
    "what": "Automated commercial capability 29 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-sal-30",
    "code": "FEAT-SAL-30",
    "module": "sale",
    "moduleName": "Sales, Bespoke CPQ & Estimations",
    "title": "Commercial Sales Feature FEAT-SAL-30: CPQ & Project Contracts",
    "technical": "sale.order.opt_30",
    "what": "Automated commercial capability 30 managing bespoke quotations, customer approvals, milestone billing, and contract governance in Odoo 19.",
    "benefit": "Protects gross profit margins, accelerates sales closing cycles, and maintains full legal and financial compliance."
  },
  {
    "id": "feat-pur-01",
    "code": "FEAT-PUR-01",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Automated Make-to-Order Shortage Replenishment",
    "technical": "purchase.order / orderpoint",
    "what": "Instantly generates draft RFQs for unstocked raw materials (custom veneers, brass accents, specialty foam) upon MO confirmation.",
    "benefit": "Cuts raw material procurement lead time by 4 days, accelerating factory start dates."
  },
  {
    "id": "feat-pur-02",
    "code": "FEAT-PUR-02",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Hardwood Lumber Grading & Container-Load RFQ Protocols",
    "technical": "purchase.order.line / lumber_grade",
    "what": "Structures international hardwood purchases by container loads (40ft HQ), board-feet volume, and NHLA lumber grades (FAS / #1 Common).",
    "benefit": "Secures direct-from-mill wholesale pricing from North American and European sawmills, saving 18-24% on raw lumber."
  },
  {
    "id": "feat-pur-03",
    "code": "FEAT-PUR-03",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Landed Cost Distribution Engine (Jeddah Port to Plants)",
    "technical": "stock.landed.cost",
    "what": "Prorates international ocean freight, customs clearance, SABER SASO inspection fees, and inland trucking across received lumber lots.",
    "benefit": "Gives finance 100% accurate per-board-foot valuation so furniture costings reflect true imported expenditure."
  },
  {
    "id": "feat-pur-04",
    "code": "FEAT-PUR-04",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Blanket Purchase Agreements for Factory Consumables",
    "technical": "purchase.requisition",
    "what": "Locks in guaranteed 12-month fixed pricing for PUR edge-banding glue, solvent-borne lacquers, sandpaper, and corrugated shipping cartons.",
    "benefit": "Insulates factory operating overhead from local chemical and packaging material inflation."
  },
  {
    "id": "feat-pur-05",
    "code": "FEAT-PUR-05",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Automated 3-Way Matching Verification Guardrail",
    "technical": "account.move / 3_way_match",
    "what": "Blocks payment of vendor bills until quantities and unit prices match the Purchase Order and Quality-Approved Goods Receipt exactly.",
    "benefit": "Prevents overbilling, duplicate payments, and unauthorized price hikes by raw material suppliers."
  },
  {
    "id": "feat-pur-06",
    "code": "FEAT-PUR-06",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Tiered Managerial Purchase Approval Workflows",
    "technical": "purchase.opt_6",
    "what": "Multi-step approval routing based on purchase value (Supervisor < 25k SAR, Plant Manager < 100k SAR, Group CEO > 100k SAR).",
    "benefit": "Enforces rigorous capital discipline while allowing fast procurement of routine tooling consumables."
  },
  {
    "id": "feat-pur-07",
    "code": "FEAT-PUR-07",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-07: Raw Materials & Supply Chain",
    "technical": "purchase.opt_7",
    "what": "Automated procurement capability 7 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-08",
    "code": "FEAT-PUR-08",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-08: Raw Materials & Supply Chain",
    "technical": "purchase.opt_8",
    "what": "Automated procurement capability 8 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-09",
    "code": "FEAT-PUR-09",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-09: Raw Materials & Supply Chain",
    "technical": "purchase.opt_9",
    "what": "Automated procurement capability 9 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-10",
    "code": "FEAT-PUR-10",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-10: Raw Materials & Supply Chain",
    "technical": "purchase.opt_10",
    "what": "Automated procurement capability 10 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-11",
    "code": "FEAT-PUR-11",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-11: Raw Materials & Supply Chain",
    "technical": "purchase.opt_11",
    "what": "Automated procurement capability 11 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-12",
    "code": "FEAT-PUR-12",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-12: Raw Materials & Supply Chain",
    "technical": "purchase.opt_12",
    "what": "Automated procurement capability 12 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-13",
    "code": "FEAT-PUR-13",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-13: Raw Materials & Supply Chain",
    "technical": "purchase.opt_13",
    "what": "Automated procurement capability 13 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-14",
    "code": "FEAT-PUR-14",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Automated Quality Hold on Incoming Lumber Receipts",
    "technical": "purchase.opt_14",
    "what": "Automatically locks received timber lots in a virtual quarantine location until dielectric moisture tests are verified (<10%).",
    "benefit": "Prevents green or moist lumber from accidentally being distributed to factory cutting lines."
  },
  {
    "id": "feat-pur-15",
    "code": "FEAT-PUR-15",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-15: Raw Materials & Supply Chain",
    "technical": "purchase.opt_15",
    "what": "Automated procurement capability 15 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-16",
    "code": "FEAT-PUR-16",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-16: Raw Materials & Supply Chain",
    "technical": "purchase.opt_16",
    "what": "Automated procurement capability 16 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-17",
    "code": "FEAT-PUR-17",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-17: Raw Materials & Supply Chain",
    "technical": "purchase.opt_17",
    "what": "Automated procurement capability 17 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-18",
    "code": "FEAT-PUR-18",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Saudi Customs Bayan Declaration & Duty Tracking",
    "technical": "purchase.opt_18",
    "what": "Logs official Fasah customs declaration numbers, HS codes, tariff duties, and VAT receipts directly against incoming purchase containers.",
    "benefit": "Ensures full statutory audit readiness for ZATCA and Saudi Customs imports."
  },
  {
    "id": "feat-pur-19",
    "code": "FEAT-PUR-19",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-19: Raw Materials & Supply Chain",
    "technical": "purchase.opt_19",
    "what": "Automated procurement capability 19 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-20",
    "code": "FEAT-PUR-20",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-20: Raw Materials & Supply Chain",
    "technical": "purchase.opt_20",
    "what": "Automated procurement capability 20 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-21",
    "code": "FEAT-PUR-21",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-21: Raw Materials & Supply Chain",
    "technical": "purchase.opt_21",
    "what": "Automated procurement capability 21 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-22",
    "code": "FEAT-PUR-22",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-22: Raw Materials & Supply Chain",
    "technical": "purchase.opt_22",
    "what": "Automated procurement capability 22 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-23",
    "code": "FEAT-PUR-23",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-23: Raw Materials & Supply Chain",
    "technical": "purchase.opt_23",
    "what": "Automated procurement capability 23 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-24",
    "code": "FEAT-PUR-24",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-24: Raw Materials & Supply Chain",
    "technical": "purchase.opt_24",
    "what": "Automated procurement capability 24 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-25",
    "code": "FEAT-PUR-25",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Saudi Local Content (SDRP) Raw Material Prioritization",
    "technical": "purchase.opt_25",
    "what": "Tags and prioritizes certified Saudi-manufactured raw materials (National Aluminum extrusions, local paints, and Najran stone).",
    "benefit": "Maximizes WD Group's Local Content score to win lucrative government and mega-project tenders."
  },
  {
    "id": "feat-pur-26",
    "code": "FEAT-PUR-26",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-26: Raw Materials & Supply Chain",
    "technical": "purchase.opt_26",
    "what": "Automated procurement capability 26 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-27",
    "code": "FEAT-PUR-27",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-27: Raw Materials & Supply Chain",
    "technical": "purchase.opt_27",
    "what": "Automated procurement capability 27 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-28",
    "code": "FEAT-PUR-28",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-28: Raw Materials & Supply Chain",
    "technical": "purchase.opt_28",
    "what": "Automated procurement capability 28 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-29",
    "code": "FEAT-PUR-29",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-29: Raw Materials & Supply Chain",
    "technical": "purchase.opt_29",
    "what": "Automated procurement capability 29 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-pur-30",
    "code": "FEAT-PUR-30",
    "module": "purchase",
    "moduleName": "Procurement & Raw Materials",
    "title": "Procurement Feature FEAT-PUR-30: Raw Materials & Supply Chain",
    "technical": "purchase.opt_30",
    "what": "Automated procurement capability 30 optimizing vendor management, international logistics, and raw material replenishment in Odoo 19.",
    "benefit": "Guarantees material availability, reduces procurement costs, and ensures strict compliance with Saudi import regulations."
  },
  {
    "id": "feat-qc-01",
    "code": "FEAT-QC-01",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "In-Process Quality Control Points (QCP) on Routing Operations",
    "technical": "quality.point / quality.check",
    "what": "Embeds mandatory quality inspection gates directly onto shop floor tablet work orders prior to advancing to the next station.",
    "benefit": "Catches machining and sanding defects early, preventing expensive downstream finishing labor on flawed parts."
  },
  {
    "id": "feat-qc-02",
    "code": "FEAT-QC-02",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Timber Moisture Dielectric Pin Meter Gate (<10%)",
    "technical": "quality.check / test_type='measure'",
    "what": "Requires operators to input 3-point pin moisture readings, automatically failing and quarantining any timber measuring above 10.0%.",
    "benefit": "Guarantees that all wood entering CNC carving and edge-banding is thoroughly seasoned, eliminating shrinkage warping."
  },
  {
    "id": "feat-qc-03",
    "code": "FEAT-QC-03",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Digital Caliper & Vernier Tolerance Verification (+/- 0.5mm)",
    "technical": "quality.point / norm_tolerance",
    "what": "Prompts operators to record tenon widths, rebate depths, and panel diagonals with automated green/red tolerance pass validation.",
    "benefit": "Maintains seamless joinery fit-up during final assembly, eliminating on-the-fly manual rasping and scraping."
  },
  {
    "id": "feat-qc-04",
    "code": "FEAT-QC-04",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Polyurethane Sheen & Micro-Gloss Meter Auditing",
    "technical": "quality.check / gloss_level",
    "what": "Logs 60° incident angle gloss meter readings (e.g. 10% Matte, 30% Satin, 90% High-Gloss) against the client's approved master control sample.",
    "benefit": "Guarantees identical visual sheen across an entire 200-piece hotel furniture installation."
  },
  {
    "id": "feat-qc-05",
    "code": "FEAT-QC-05",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Formal Non-Conformance Reports (NCR) & CAPA Workflows",
    "technical": "quality.alert / mrp.production",
    "what": "Generates formal Non-Conformance Reports with root-cause categorization (Operator, Machine Tool, Raw Material Defect, Environmental).",
    "benefit": "Drives systemic factory improvement and prevents repeat fabrication errors through governed corrective actions."
  },
  {
    "id": "feat-qc-06",
    "code": "FEAT-QC-06",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "ASTM D3359 Cross-Hatch Finish Adhesion Tape Testing",
    "technical": "quality.test.opt_6",
    "what": "Mandates lattice pattern cross-hatch blade scoring and pressure-sensitive tape peel tests on sample finished timber coupons.",
    "benefit": "Ensures polyurethane and acrylic finishes will not chip or flake during years of heavy hotel usage."
  },
  {
    "id": "feat-qc-07",
    "code": "FEAT-QC-07",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-07: Standards & Testing",
    "technical": "quality.test.opt_7",
    "what": "Automated quality assurance capability 7 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-08",
    "code": "FEAT-QC-08",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-08: Standards & Testing",
    "technical": "quality.test.opt_8",
    "what": "Automated quality assurance capability 8 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-09",
    "code": "FEAT-QC-09",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-09: Standards & Testing",
    "technical": "quality.test.opt_9",
    "what": "Automated quality assurance capability 9 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-10",
    "code": "FEAT-QC-10",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "100-Point Pre-Shipment White-Glove Audit Checklist",
    "technical": "quality.test.opt_10",
    "what": [
      "Comprehensive final inspection gate covering drawer glide smoothness, soft-close alignment, edge tape adhesion, and hardware tightness."
    ],
    "benefit": [
      "Guarantees 100% defect-free dispatch, eliminating embarrassing site rework during client handovers."
    ]
  },
  {
    "id": "feat-qc-11",
    "code": "FEAT-QC-11",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-11: Standards & Testing",
    "technical": "quality.test.opt_11",
    "what": "Automated quality assurance capability 11 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-12",
    "code": "FEAT-QC-12",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-12: Standards & Testing",
    "technical": "quality.test.opt_12",
    "what": "Automated quality assurance capability 12 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-13",
    "code": "FEAT-QC-13",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-13: Standards & Testing",
    "technical": "quality.test.opt_13",
    "what": "Automated quality assurance capability 13 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-14",
    "code": "FEAT-QC-14",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-14: Standards & Testing",
    "technical": "quality.test.opt_14",
    "what": "Automated quality assurance capability 14 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-15",
    "code": "FEAT-QC-15",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-15: Standards & Testing",
    "technical": "quality.test.opt_15",
    "what": "Automated quality assurance capability 15 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-16",
    "code": "FEAT-QC-16",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-16: Standards & Testing",
    "technical": "quality.test.opt_16",
    "what": "Automated quality assurance capability 16 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-17",
    "code": "FEAT-QC-17",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-17: Standards & Testing",
    "technical": "quality.test.opt_17",
    "what": "Automated quality assurance capability 17 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-18",
    "code": "FEAT-QC-18",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Automated Certificate of Conformity (CoC) PDF Generator",
    "technical": "quality.test.opt_18",
    "what": [
      "Generates bilingual cryptographic Certificates of Conformity certifying that timber, adhesives, and finishes meet SASO standards."
    ],
    "benefit": [
      "Required by high-end commercial clients, architects, and government entities for contract milestone sign-offs."
    ]
  },
  {
    "id": "feat-qc-19",
    "code": "FEAT-QC-19",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-19: Standards & Testing",
    "technical": "quality.test.opt_19",
    "what": "Automated quality assurance capability 19 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-20",
    "code": "FEAT-QC-20",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-20: Standards & Testing",
    "technical": "quality.test.opt_20",
    "what": "Automated quality assurance capability 20 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-21",
    "code": "FEAT-QC-21",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-21: Standards & Testing",
    "technical": "quality.test.opt_21",
    "what": "Automated quality assurance capability 21 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-22",
    "code": "FEAT-QC-22",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-22: Standards & Testing",
    "technical": "quality.test.opt_22",
    "what": "Automated quality assurance capability 22 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-23",
    "code": "FEAT-QC-23",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-23: Standards & Testing",
    "technical": "quality.test.opt_23",
    "what": "Automated quality assurance capability 23 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-24",
    "code": "FEAT-QC-24",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-24: Standards & Testing",
    "technical": "quality.test.opt_24",
    "what": "Automated quality assurance capability 24 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-25",
    "code": "FEAT-QC-25",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-25: Standards & Testing",
    "technical": "quality.test.opt_25",
    "what": "Automated quality assurance capability 25 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-26",
    "code": "FEAT-QC-26",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Ultrasonic Internal Crack Detection on Travertine Slabs",
    "technical": "quality.test.opt_26",
    "what": [
      "Integrates non-destructive ultrasonic pulse velocity testing to detect internal voids inside Najran Travertine before CNC milling."
    ],
    "benefit": [
      "Prevents catastrophic stone slab shattering on expensive 5-axis CNC router beds."
    ]
  },
  {
    "id": "feat-qc-27",
    "code": "FEAT-QC-27",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-27: Standards & Testing",
    "technical": "quality.test.opt_27",
    "what": "Automated quality assurance capability 27 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-28",
    "code": "FEAT-QC-28",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-28: Standards & Testing",
    "technical": "quality.test.opt_28",
    "what": "Automated quality assurance capability 28 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-29",
    "code": "FEAT-QC-29",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-29: Standards & Testing",
    "technical": "quality.test.opt_29",
    "what": "Automated quality assurance capability 29 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-qc-30",
    "code": "FEAT-QC-30",
    "module": "qc",
    "moduleName": "Quality Assurance & Defect NCR",
    "title": "Quality Control Feature FEAT-QC-30: Standards & Testing",
    "technical": "quality.test.opt_30",
    "what": "Automated quality assurance capability 30 validating raw materials, shop floor tolerances, and finished furniture in Odoo 19.",
    "benefit": "Eliminates on-site installation defects, guarantees warranty compliance, and protects corporate brand prestige."
  },
  {
    "id": "feat-mnt-01",
    "code": "FEAT-MNT-01",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Total Productive Maintenance (TPM) Master Schedule",
    "technical": "maintenance.request / maintenance.equipment",
    "what": "Schedules preventive maintenance based on both elapsed operating calendar days and cumulative machine spindle run hours.",
    "benefit": "Prevents catastrophic machine failures and extends the operational life of multi-million SAR woodworking equipment."
  },
  {
    "id": "feat-mnt-02",
    "code": "FEAT-MNT-02",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "5-Axis CNC Router Spindle & Collet Precision Care",
    "technical": "maintenance.plan / spindle_monitoring",
    "what": "Automated maintenance protocol tracking HSK collet torque, pneumatic clamping force, and high-frequency spindle bearing runout.",
    "benefit": "Maintains 0.05mm carving precision on complex 3D wood reliefs and prevents costly spindle burnouts."
  },
  {
    "id": "feat-mnt-03",
    "code": "FEAT-MNT-03",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Beam Saw Blade Sharpening Cycles (1,500m Cut Tracking)",
    "technical": "maintenance.equipment / blade_linear_meters",
    "what": "Tracks cumulative linear meters cut by main and scoring saw blades, automatically generating blade-swap work orders at 1,500 meters.",
    "benefit": "Eliminates edge chipping on double-sided melamine boards and cuts edge-banding reject rates by 90%."
  },
  {
    "id": "feat-mnt-04",
    "code": "FEAT-MNT-04",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "PUR Edge-Bander Nitrogen Flushing & Glue Pot Purge",
    "technical": "maintenance.request / pur_glue_purge",
    "what": "Enforces mandatory daily nitrogen gas flushing and weekly chemical wax purges on polyurethane (PUR) hot-melt glue applicators.",
    "benefit": "Prevents catastrophic glue hardening inside application rollers that would require complete unit rebuilding."
  },
  {
    "id": "feat-mnt-05",
    "code": "FEAT-MNT-05",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Central Dust Extraction Differential Pressure Monitoring",
    "technical": "maintenance.equipment / dust_system",
    "what": "Monitors Magnehelic differential pressure gauges across baghouse filters, automatically triggering reverse-pulse jet compressed air cleaning.",
    "benefit": "Ensures 100% dust extraction suction at machine tables, protecting worker respiratory health and finish quality."
  },
  {
    "id": "feat-mai-06",
    "code": "FEAT-MNT-06",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-06",
    "technical": "maintenance.equipment.opt_6",
    "what": "Automated industrial capability 6 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-07",
    "code": "FEAT-MNT-07",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-07",
    "technical": "maintenance.equipment.opt_7",
    "what": "Automated industrial capability 7 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-08",
    "code": "FEAT-MNT-08",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-08",
    "technical": "maintenance.equipment.opt_8",
    "what": "Automated industrial capability 8 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-09",
    "code": "FEAT-MNT-09",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-09",
    "technical": "maintenance.equipment.opt_9",
    "what": "Automated industrial capability 9 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-10",
    "code": "FEAT-MNT-10",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-10",
    "technical": "maintenance.equipment.opt_10",
    "what": "Automated industrial capability 10 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-11",
    "code": "FEAT-MNT-11",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-11",
    "technical": "maintenance.equipment.opt_11",
    "what": "Automated industrial capability 11 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-12",
    "code": "FEAT-MNT-12",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-12",
    "technical": "maintenance.equipment.opt_12",
    "what": "Automated industrial capability 12 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-13",
    "code": "FEAT-MNT-13",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-13",
    "technical": "maintenance.equipment.opt_13",
    "what": "Automated industrial capability 13 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-14",
    "code": "FEAT-MNT-14",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-14",
    "technical": "maintenance.equipment.opt_14",
    "what": "Automated industrial capability 14 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-15",
    "code": "FEAT-MNT-15",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-15",
    "technical": "maintenance.equipment.opt_15",
    "what": "Automated industrial capability 15 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-16",
    "code": "FEAT-MNT-16",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-16",
    "technical": "maintenance.equipment.opt_16",
    "what": "Automated industrial capability 16 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-17",
    "code": "FEAT-MNT-17",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-17",
    "technical": "maintenance.equipment.opt_17",
    "what": "Automated industrial capability 17 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-18",
    "code": "FEAT-MNT-18",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-18",
    "technical": "maintenance.equipment.opt_18",
    "what": "Automated industrial capability 18 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-19",
    "code": "FEAT-MNT-19",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-19",
    "technical": "maintenance.equipment.opt_19",
    "what": "Automated industrial capability 19 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-20",
    "code": "FEAT-MNT-20",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-20",
    "technical": "maintenance.equipment.opt_20",
    "what": "Automated industrial capability 20 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-21",
    "code": "FEAT-MNT-21",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-21",
    "technical": "maintenance.equipment.opt_21",
    "what": "Automated industrial capability 21 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-22",
    "code": "FEAT-MNT-22",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-22",
    "technical": "maintenance.equipment.opt_22",
    "what": "Automated industrial capability 22 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-23",
    "code": "FEAT-MNT-23",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-23",
    "technical": "maintenance.equipment.opt_23",
    "what": "Automated industrial capability 23 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-24",
    "code": "FEAT-MNT-24",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-24",
    "technical": "maintenance.equipment.opt_24",
    "what": "Automated industrial capability 24 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-25",
    "code": "FEAT-MNT-25",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-25",
    "technical": "maintenance.equipment.opt_25",
    "what": "Automated industrial capability 25 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-26",
    "code": "FEAT-MNT-26",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-26",
    "technical": "maintenance.equipment.opt_26",
    "what": "Automated industrial capability 26 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-27",
    "code": "FEAT-MNT-27",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-27",
    "technical": "maintenance.equipment.opt_27",
    "what": "Automated industrial capability 27 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-28",
    "code": "FEAT-MNT-28",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-28",
    "technical": "maintenance.equipment.opt_28",
    "what": "Automated industrial capability 28 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-29",
    "code": "FEAT-MNT-29",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-29",
    "technical": "maintenance.equipment.opt_29",
    "what": "Automated industrial capability 29 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-mai-30",
    "code": "FEAT-MNT-30",
    "module": "maintenance",
    "moduleName": "Equipment & Work Center TPM",
    "title": "Reliability & Asset Care FEAT-MNT-30",
    "technical": "maintenance.equipment.opt_30",
    "what": "Automated industrial capability 30 in Equipment & Work Center TPM optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-01",
    "code": "FEAT-ACC-01",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Real-Time Direct Absorption Costing Engine",
    "technical": "mrp.account / stock_account",
    "what": "Dynamically accumulates raw timber, hardware, direct labor hours, and machine-hour burden rates into the true cost of each finished piece.",
    "benefit": "Replaces crude average markups with exact manufacturing costs, protecting profitability on bespoke hospitality contracts."
  },
  {
    "id": "feat-acc-02",
    "code": "FEAT-ACC-02",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Work Center Hourly Machine Burden Rates",
    "technical": "mrp.workcenter / costs_hour",
    "what": "Calculates distinct hourly rates for 5-axis CNCs, beam saws, and spray booths covering electrical draw, tooling wear, and factory rent.",
    "benefit": "Reflects the true capital cost of complex carved furniture versus simple straight-cut panel joinery."
  },
  {
    "id": "feat-acc-03",
    "code": "FEAT-ACC-03",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Raw Timber Yield Scrap Variance Accounting",
    "technical": "account.analytic.line / scrap_variance",
    "what": "Isolates and quantifies financial variances between theoretical BOM wood volume and actual logs consumed on the shop floor.",
    "benefit": "Pinpoints whether material overruns are caused by poor lumber grading or inefficient operator saw nesting."
  },
  {
    "id": "feat-acc-04",
    "code": "FEAT-ACC-04",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Work-in-Progress (WIP) Automated Balance Sheet Valuation",
    "technical": "stock.valuation.layer / account.move",
    "what": "Generates automated journal entries reflecting the value of semi-finished furniture moving between woodwork, upholstery, and finishing.",
    "benefit": "Provides executive management and external auditors with 100% auditable monthly balance sheets."
  },
  {
    "id": "feat-acc-05",
    "code": "FEAT-ACC-05",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Official ZATCA Phase 2 (FATOORA) Clearance & Reporting",
    "technical": "l10n_sa_edi / zatca_fatoora",
    "what": "Direct cryptographic XML clearance for B2B commercial invoices and sequential hash-chained QR codes for retail client transactions.",
    "benefit": "Guarantees 100% compliance with Saudi tax authorities and prevents statutory penalties."
  },
  {
    "id": "feat-acc-06",
    "code": "FEAT-ACC-06",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-06",
    "technical": "account.analytic.line.opt_6",
    "what": "Automated industrial capability 6 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-07",
    "code": "FEAT-ACC-07",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-07",
    "technical": "account.analytic.line.opt_7",
    "what": "Automated industrial capability 7 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-08",
    "code": "FEAT-ACC-08",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-08",
    "technical": "account.analytic.line.opt_8",
    "what": "Automated industrial capability 8 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-09",
    "code": "FEAT-ACC-09",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-09",
    "technical": "account.analytic.line.opt_9",
    "what": "Automated industrial capability 9 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-10",
    "code": "FEAT-ACC-10",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-10",
    "technical": "account.analytic.line.opt_10",
    "what": "Automated industrial capability 10 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-11",
    "code": "FEAT-ACC-11",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-11",
    "technical": "account.analytic.line.opt_11",
    "what": "Automated industrial capability 11 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-12",
    "code": "FEAT-ACC-12",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-12",
    "technical": "account.analytic.line.opt_12",
    "what": "Automated industrial capability 12 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-13",
    "code": "FEAT-ACC-13",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-13",
    "technical": "account.analytic.line.opt_13",
    "what": "Automated industrial capability 13 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-14",
    "code": "FEAT-ACC-14",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-14",
    "technical": "account.analytic.line.opt_14",
    "what": "Automated industrial capability 14 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-15",
    "code": "FEAT-ACC-15",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-15",
    "technical": "account.analytic.line.opt_15",
    "what": "Automated industrial capability 15 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-16",
    "code": "FEAT-ACC-16",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-16",
    "technical": "account.analytic.line.opt_16",
    "what": "Automated industrial capability 16 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-17",
    "code": "FEAT-ACC-17",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-17",
    "technical": "account.analytic.line.opt_17",
    "what": "Automated industrial capability 17 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-18",
    "code": "FEAT-ACC-18",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-18",
    "technical": "account.analytic.line.opt_18",
    "what": "Automated industrial capability 18 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-19",
    "code": "FEAT-ACC-19",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-19",
    "technical": "account.analytic.line.opt_19",
    "what": "Automated industrial capability 19 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-20",
    "code": "FEAT-ACC-20",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-20",
    "technical": "account.analytic.line.opt_20",
    "what": "Automated industrial capability 20 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-21",
    "code": "FEAT-ACC-21",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-21",
    "technical": "account.analytic.line.opt_21",
    "what": "Automated industrial capability 21 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-22",
    "code": "FEAT-ACC-22",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-22",
    "technical": "account.analytic.line.opt_22",
    "what": "Automated industrial capability 22 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-23",
    "code": "FEAT-ACC-23",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-23",
    "technical": "account.analytic.line.opt_23",
    "what": "Automated industrial capability 23 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-24",
    "code": "FEAT-ACC-24",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-24",
    "technical": "account.analytic.line.opt_24",
    "what": "Automated industrial capability 24 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-25",
    "code": "FEAT-ACC-25",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-25",
    "technical": "account.analytic.line.opt_25",
    "what": "Automated industrial capability 25 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-26",
    "code": "FEAT-ACC-26",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-26",
    "technical": "account.analytic.line.opt_26",
    "what": "Automated industrial capability 26 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-27",
    "code": "FEAT-ACC-27",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-27",
    "technical": "account.analytic.line.opt_27",
    "what": "Automated industrial capability 27 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-28",
    "code": "FEAT-ACC-28",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-28",
    "technical": "account.analytic.line.opt_28",
    "what": "Automated industrial capability 28 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-29",
    "code": "FEAT-ACC-29",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-29",
    "technical": "account.analytic.line.opt_29",
    "what": "Automated industrial capability 29 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-acc-30",
    "code": "FEAT-ACC-30",
    "module": "accounting",
    "moduleName": "Cost Accounting & Ledgers",
    "title": "Financial Controls & Absorption Costing FEAT-ACC-30",
    "technical": "account.analytic.line.opt_30",
    "what": "Automated industrial capability 30 in Cost Accounting & Ledgers optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-01",
    "code": "FEAT-PLM-01",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Formal Engineering Change Order (ECO) Workflow",
    "technical": "mrp.eco / mrp.eco.type",
    "what": "Governs design modifications, material substitutions, and joinery revisions with gated impact analysis and cryptographic sign-offs.",
    "benefit": "Prevents unauthorized shop floor modifications and eliminates costly miscommunications between architects and carpenters."
  },
  {
    "id": "feat-plm-02",
    "code": "FEAT-PLM-02",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "CAD/CAM File Centralized Revision Control",
    "technical": "ir.attachment / plm.document",
    "what": "Stores versioned SolidWorks assemblies, TopSolid parametric models, and CNC G-code programs directly attached to the furniture BoM.",
    "benefit": "Guarantees CNC operators run the latest approved cutting toolpaths, eliminating scrap from outdated programs."
  },
  {
    "id": "feat-plm-03",
    "code": "FEAT-PLM-03",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Side-by-Side Visual BoM Diff & Comparison Engine",
    "technical": "mrp.bom / plm.diff",
    "what": "Provides visual color-coded comparison highlighting added, modified, or deleted raw materials between BoM Revision A and Revision B.",
    "benefit": "Enables cost accountants and plant managers to instantly assess the material cost delta of client design changes."
  },
  {
    "id": "feat-plm-04",
    "code": "FEAT-PLM-04",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Nesting Cut-Sheet Optimization Integration",
    "technical": "mrp.bom.line / nesting_sheet",
    "what": "Interfaces nesting software algorithms (OptiCut, CutMaster) with Odoo BOMs to optimize panel layout yields on beam saws and CNCs.",
    "benefit": "Achieves up to 88% sheet goods material utilization, saving hundreds of thousands of SAR in panel costs annually."
  },
  {
    "id": "feat-plm-05",
    "code": "FEAT-PLM-05",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Grain Orientation Engineering Rules Enforcement",
    "technical": "mrp.bom.line / grain_direction",
    "what": "Embeds explicit longitudinal or transverse grain direction flags on panel parts to ensure visual continuity across cabinet doors and drawer fronts.",
    "benefit": "Prevents mismatched veneer grain that ruins the aesthetic perfection of bespoke executive desks and consoles."
  },
  {
    "id": "feat-plm-06",
    "code": "FEAT-PLM-06",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-06",
    "technical": "mrp.eco.opt_6",
    "what": "Automated industrial capability 6 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-07",
    "code": "FEAT-PLM-07",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-07",
    "technical": "mrp.eco.opt_7",
    "what": "Automated industrial capability 7 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-08",
    "code": "FEAT-PLM-08",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-08",
    "technical": "mrp.eco.opt_8",
    "what": "Automated industrial capability 8 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-09",
    "code": "FEAT-PLM-09",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-09",
    "technical": "mrp.eco.opt_9",
    "what": "Automated industrial capability 9 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-10",
    "code": "FEAT-PLM-10",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-10",
    "technical": "mrp.eco.opt_10",
    "what": "Automated industrial capability 10 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-11",
    "code": "FEAT-PLM-11",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-11",
    "technical": "mrp.eco.opt_11",
    "what": "Automated industrial capability 11 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-12",
    "code": "FEAT-PLM-12",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-12",
    "technical": "mrp.eco.opt_12",
    "what": "Automated industrial capability 12 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-13",
    "code": "FEAT-PLM-13",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-13",
    "technical": "mrp.eco.opt_13",
    "what": "Automated industrial capability 13 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-14",
    "code": "FEAT-PLM-14",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-14",
    "technical": "mrp.eco.opt_14",
    "what": "Automated industrial capability 14 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-15",
    "code": "FEAT-PLM-15",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-15",
    "technical": "mrp.eco.opt_15",
    "what": "Automated industrial capability 15 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-16",
    "code": "FEAT-PLM-16",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-16",
    "technical": "mrp.eco.opt_16",
    "what": "Automated industrial capability 16 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-17",
    "code": "FEAT-PLM-17",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-17",
    "technical": "mrp.eco.opt_17",
    "what": "Automated industrial capability 17 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-18",
    "code": "FEAT-PLM-18",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-18",
    "technical": "mrp.eco.opt_18",
    "what": "Automated industrial capability 18 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-19",
    "code": "FEAT-PLM-19",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-19",
    "technical": "mrp.eco.opt_19",
    "what": "Automated industrial capability 19 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-20",
    "code": "FEAT-PLM-20",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-20",
    "technical": "mrp.eco.opt_20",
    "what": "Automated industrial capability 20 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-21",
    "code": "FEAT-PLM-21",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-21",
    "technical": "mrp.eco.opt_21",
    "what": "Automated industrial capability 21 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-22",
    "code": "FEAT-PLM-22",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-22",
    "technical": "mrp.eco.opt_22",
    "what": "Automated industrial capability 22 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-23",
    "code": "FEAT-PLM-23",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-23",
    "technical": "mrp.eco.opt_23",
    "what": "Automated industrial capability 23 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-24",
    "code": "FEAT-PLM-24",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-24",
    "technical": "mrp.eco.opt_24",
    "what": "Automated industrial capability 24 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-25",
    "code": "FEAT-PLM-25",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-25",
    "technical": "mrp.eco.opt_25",
    "what": "Automated industrial capability 25 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-26",
    "code": "FEAT-PLM-26",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-26",
    "technical": "mrp.eco.opt_26",
    "what": "Automated industrial capability 26 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-27",
    "code": "FEAT-PLM-27",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-27",
    "technical": "mrp.eco.opt_27",
    "what": "Automated industrial capability 27 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-28",
    "code": "FEAT-PLM-28",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-28",
    "technical": "mrp.eco.opt_28",
    "what": "Automated industrial capability 28 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-29",
    "code": "FEAT-PLM-29",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-29",
    "technical": "mrp.eco.opt_29",
    "what": "Automated industrial capability 29 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-plm-30",
    "code": "FEAT-PLM-30",
    "module": "plm",
    "moduleName": "PLM & Engineering ECO",
    "title": "Design Governance & Product Lifecycle FEAT-PLM-30",
    "technical": "mrp.eco.opt_30",
    "what": "Automated industrial capability 30 in PLM & Engineering ECO optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-01",
    "code": "FEAT-KIO-01",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Rugged Glove-Friendly Tablet Touch Interface",
    "technical": "mrp_workcenter / shop_floor_ui",
    "what": "High-contrast, large-button touchscreen UI designed for dusty sawmill, joinery, and spray booth environments.",
    "benefit": "Allows machine operators to advance work orders and log times without removing heavy protective leather gloves."
  },
  {
    "id": "feat-kio-02",
    "code": "FEAT-KIO-02",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Operator NFC & Barcode Badge Scan-to-Clock-In",
    "technical": "hr_attendance / mrp.workorder",
    "what": "Instantly authenticates operators and clocks direct labor hours against active work orders via contactless employee badges.",
    "benefit": "Eliminates fraudulent buddy-punching and guarantees 100% accurate labor costing per furniture piece."
  },
  {
    "id": "feat-kio-03",
    "code": "FEAT-KIO-03",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Real-Time Spindle Run-Time & Setup Timers",
    "technical": "mrp.workcenter.productivity",
    "what": "Separates setup time (tool changing, workpiece clamping) from productive cutting time with automated pause triggers.",
    "benefit": "Uncovers hidden setup inefficiencies to optimize machine availability across factory shifts."
  },
  {
    "id": "feat-kio-04",
    "code": "FEAT-KIO-04",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Instant Tablet Scrap & Defect Quantity Submission",
    "technical": "stock.scrap / shop_floor",
    "what": "Enables operators to record cracked boards or mis-drilled panels with one tap, selecting root causes (Split Knot, Tool Chatter, Slip).",
    "benefit": "Triggers immediate automated replenishment from raw timber stores before the shift ends."
  },
  {
    "id": "feat-kio-05",
    "code": "FEAT-KIO-05",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Digital PDF & High-Resolution CAD Shop Drawing Viewer",
    "technical": "mrp.document / tablet_viewer",
    "what": "Direct rendering of zoomable vector shop drawings, joint cross-sections, and edge-banding profiles on the workstation screen.",
    "benefit": "Replaces grease-stained paper blueprints, ensuring operators always build from Revision B."
  },
  {
    "id": "feat-kio-06",
    "code": "FEAT-KIO-06",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-06",
    "technical": "mrp.workcenter.productivity.opt_6",
    "what": "Automated industrial capability 6 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-07",
    "code": "FEAT-KIO-07",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-07",
    "technical": "mrp.workcenter.productivity.opt_7",
    "what": "Automated industrial capability 7 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-08",
    "code": "FEAT-KIO-08",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-08",
    "technical": "mrp.workcenter.productivity.opt_8",
    "what": "Automated industrial capability 8 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-09",
    "code": "FEAT-KIO-09",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-09",
    "technical": "mrp.workcenter.productivity.opt_9",
    "what": "Automated industrial capability 9 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-10",
    "code": "FEAT-KIO-10",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-10",
    "technical": "mrp.workcenter.productivity.opt_10",
    "what": "Automated industrial capability 10 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-11",
    "code": "FEAT-KIO-11",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-11",
    "technical": "mrp.workcenter.productivity.opt_11",
    "what": "Automated industrial capability 11 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-12",
    "code": "FEAT-KIO-12",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-12",
    "technical": "mrp.workcenter.productivity.opt_12",
    "what": "Automated industrial capability 12 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-13",
    "code": "FEAT-KIO-13",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-13",
    "technical": "mrp.workcenter.productivity.opt_13",
    "what": "Automated industrial capability 13 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-14",
    "code": "FEAT-KIO-14",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-14",
    "technical": "mrp.workcenter.productivity.opt_14",
    "what": "Automated industrial capability 14 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-15",
    "code": "FEAT-KIO-15",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-15",
    "technical": "mrp.workcenter.productivity.opt_15",
    "what": "Automated industrial capability 15 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-16",
    "code": "FEAT-KIO-16",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-16",
    "technical": "mrp.workcenter.productivity.opt_16",
    "what": "Automated industrial capability 16 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-17",
    "code": "FEAT-KIO-17",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-17",
    "technical": "mrp.workcenter.productivity.opt_17",
    "what": "Automated industrial capability 17 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-18",
    "code": "FEAT-KIO-18",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-18",
    "technical": "mrp.workcenter.productivity.opt_18",
    "what": "Automated industrial capability 18 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-19",
    "code": "FEAT-KIO-19",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-19",
    "technical": "mrp.workcenter.productivity.opt_19",
    "what": "Automated industrial capability 19 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-20",
    "code": "FEAT-KIO-20",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-20",
    "technical": "mrp.workcenter.productivity.opt_20",
    "what": "Automated industrial capability 20 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-21",
    "code": "FEAT-KIO-21",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-21",
    "technical": "mrp.workcenter.productivity.opt_21",
    "what": "Automated industrial capability 21 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-22",
    "code": "FEAT-KIO-22",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-22",
    "technical": "mrp.workcenter.productivity.opt_22",
    "what": "Automated industrial capability 22 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-23",
    "code": "FEAT-KIO-23",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-23",
    "technical": "mrp.workcenter.productivity.opt_23",
    "what": "Automated industrial capability 23 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-24",
    "code": "FEAT-KIO-24",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-24",
    "technical": "mrp.workcenter.productivity.opt_24",
    "what": "Automated industrial capability 24 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-25",
    "code": "FEAT-KIO-25",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-25",
    "technical": "mrp.workcenter.productivity.opt_25",
    "what": "Automated industrial capability 25 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-26",
    "code": "FEAT-KIO-26",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-26",
    "technical": "mrp.workcenter.productivity.opt_26",
    "what": "Automated industrial capability 26 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-27",
    "code": "FEAT-KIO-27",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-27",
    "technical": "mrp.workcenter.productivity.opt_27",
    "what": "Automated industrial capability 27 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-28",
    "code": "FEAT-KIO-28",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-28",
    "technical": "mrp.workcenter.productivity.opt_28",
    "what": "Automated industrial capability 28 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-29",
    "code": "FEAT-KIO-29",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-29",
    "technical": "mrp.workcenter.productivity.opt_29",
    "what": "Automated industrial capability 29 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-kio-30",
    "code": "FEAT-KIO-30",
    "module": "kiosks",
    "moduleName": "Shop Floor Kiosks & Labor",
    "title": "Shop Floor Execution & Operator Enablement FEAT-KIO-30",
    "technical": "mrp.workcenter.productivity.opt_30",
    "what": "Automated industrial capability 30 in Shop Floor Kiosks & Labor optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-01",
    "code": "FEAT-LOG-01",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "Reverse LIFO Truck Load Staging & Sequencing",
    "technical": "stock.picking / load_sequencing",
    "what": "Sequences the loading of blanket-wrapped luxury furniture in exact reverse order of delivery drops (Last In, First Out).",
    "benefit": "Prevents double-handling and eliminates accidental freight damage caused by shifting cargo at intermediate stops."
  },
  {
    "id": "feat-log-02",
    "code": "FEAT-LOG-02",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "Site Access & Freight Elevator Dimension Verification",
    "technical": "project.task / site_survey",
    "what": "Captures architectural site survey data (elevator door width, stairwell turning radius, ceiling heights) prior to dispatching large conference tables.",
    "benefit": "Eliminates frustrating delivery aborts where oversized bespoke pieces cannot physically enter the client's penthouse or suite."
  },
  {
    "id": "feat-log-03",
    "code": "FEAT-LOG-03",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "Mobile Glass Cryptographic Customer e-Signature Capture",
    "technical": "sign.request / stock.picking",
    "what": "Captures client signature and GPS coordinates on mobile tablets upon successful white-glove installation and site inspection.",
    "benefit": "Provides legally bulletproof proof of delivery (POD), accelerating final 10% contract retention billing."
  },
  {
    "id": "feat-log-04",
    "code": "FEAT-LOG-04",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "On-Site Installation Defect Punch-List with Photo Capture",
    "technical": "project.task / punch_list",
    "what": "Enables site install leads to photograph minor transit scuffs or missing screw caps and assign instant touch-up tickets.",
    "benefit": "Resolves punch-list items within 24 hours before the general contractor conducts final hotel handover inspections."
  },
  {
    "id": "feat-log-05",
    "code": "FEAT-LOG-05",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "Mobile Touch-Up Kit & Wax Stick Van Inventory Tracking",
    "technical": "stock.location / van_inventory",
    "what": "Tracks mobile inventory of color-matched wood wax sticks, aerosol touch-up lacquers, and spare drawer slides inside installation vans.",
    "benefit": "Enables installers to remedy minor installation scuffs immediately on-site without requiring factory return trips."
  },
  {
    "id": "feat-log-06",
    "code": "FEAT-LOG-06",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-06",
    "technical": "stock.picking.delivery.opt_6",
    "what": "Automated industrial capability 6 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-07",
    "code": "FEAT-LOG-07",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-07",
    "technical": "stock.picking.delivery.opt_7",
    "what": "Automated industrial capability 7 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-08",
    "code": "FEAT-LOG-08",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-08",
    "technical": "stock.picking.delivery.opt_8",
    "what": "Automated industrial capability 8 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-09",
    "code": "FEAT-LOG-09",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-09",
    "technical": "stock.picking.delivery.opt_9",
    "what": "Automated industrial capability 9 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-10",
    "code": "FEAT-LOG-10",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-10",
    "technical": "stock.picking.delivery.opt_10",
    "what": "Automated industrial capability 10 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-11",
    "code": "FEAT-LOG-11",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-11",
    "technical": "stock.picking.delivery.opt_11",
    "what": "Automated industrial capability 11 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-12",
    "code": "FEAT-LOG-12",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-12",
    "technical": "stock.picking.delivery.opt_12",
    "what": "Automated industrial capability 12 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-13",
    "code": "FEAT-LOG-13",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-13",
    "technical": "stock.picking.delivery.opt_13",
    "what": "Automated industrial capability 13 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-14",
    "code": "FEAT-LOG-14",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-14",
    "technical": "stock.picking.delivery.opt_14",
    "what": "Automated industrial capability 14 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-15",
    "code": "FEAT-LOG-15",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-15",
    "technical": "stock.picking.delivery.opt_15",
    "what": "Automated industrial capability 15 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-16",
    "code": "FEAT-LOG-16",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-16",
    "technical": "stock.picking.delivery.opt_16",
    "what": "Automated industrial capability 16 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-17",
    "code": "FEAT-LOG-17",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-17",
    "technical": "stock.picking.delivery.opt_17",
    "what": "Automated industrial capability 17 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-18",
    "code": "FEAT-LOG-18",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-18",
    "technical": "stock.picking.delivery.opt_18",
    "what": "Automated industrial capability 18 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-19",
    "code": "FEAT-LOG-19",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-19",
    "technical": "stock.picking.delivery.opt_19",
    "what": "Automated industrial capability 19 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-20",
    "code": "FEAT-LOG-20",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-20",
    "technical": "stock.picking.delivery.opt_20",
    "what": "Automated industrial capability 20 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-21",
    "code": "FEAT-LOG-21",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-21",
    "technical": "stock.picking.delivery.opt_21",
    "what": "Automated industrial capability 21 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-22",
    "code": "FEAT-LOG-22",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-22",
    "technical": "stock.picking.delivery.opt_22",
    "what": "Automated industrial capability 22 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-23",
    "code": "FEAT-LOG-23",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-23",
    "technical": "stock.picking.delivery.opt_23",
    "what": "Automated industrial capability 23 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-24",
    "code": "FEAT-LOG-24",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-24",
    "technical": "stock.picking.delivery.opt_24",
    "what": "Automated industrial capability 24 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-25",
    "code": "FEAT-LOG-25",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-25",
    "technical": "stock.picking.delivery.opt_25",
    "what": "Automated industrial capability 25 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-26",
    "code": "FEAT-LOG-26",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-26",
    "technical": "stock.picking.delivery.opt_26",
    "what": "Automated industrial capability 26 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-27",
    "code": "FEAT-LOG-27",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-27",
    "technical": "stock.picking.delivery.opt_27",
    "what": "Automated industrial capability 27 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-28",
    "code": "FEAT-LOG-28",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-28",
    "technical": "stock.picking.delivery.opt_28",
    "what": "Automated industrial capability 28 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-29",
    "code": "FEAT-LOG-29",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-29",
    "technical": "stock.picking.delivery.opt_29",
    "what": "Automated industrial capability 29 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  },
  {
    "id": "feat-log-30",
    "code": "FEAT-LOG-30",
    "module": "logistics",
    "moduleName": "White-Glove Logistics & Assembly",
    "title": "White-Glove Delivery & Installation FEAT-LOG-30",
    "technical": "stock.picking.delivery.opt_30",
    "what": "Automated industrial capability 30 in White-Glove Logistics & Assembly optimizing factory throughput and operations in Odoo 19.",
    "benefit": "Guarantees strict process compliance, reduces operational cycle time, and ensures high-precision furniture fabrication."
  }
];
