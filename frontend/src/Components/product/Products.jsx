const products = [
  // { id: 1, name: "Warner", brand: "Cisco", imae:'"https://5.imimg.com/data5/SELLER/Default/2023/12/368269740/VP/YV/NP/183145451/cisco-network-switch-500x500.png' , description: "The Cisco C1000-24P-4X-L is a high-performance, managed Ethernet switch designed for small to medium-sized businesses (SMBs) that require reliable and scalable networking solutions. It features 24 Gigabit Ethernet ports and 4 SFP+ uplink ports, providing excellent flexibility and performance for businesses looking to expand their network infrastructure. The switch also supports Power over Ethernet (PoE) on all 24 ports, allowing it to deliver both data and power to connected devices such as IP phones, wireless access points, and security cameras." , thumbnail:"https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1", category:"Router"},
  {
    id: 2,
    name: "EPYC 7542",
    brand: "Cisco",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzzozyHBoOoTmrwY_Ye2h6NvOdFOMzUEJHg&s",
    description:
      "The AMD EPYC 7542 is a high-performance 32-core, 64-thread server processor with a base clock of 2.9 GHz, boosting up to 3.4 GHz. Built on the Zen 2 architecture, it features 128 MB of L3 cache, PCIe 4.0 connectivity, and supports eight-channel DDR4 memory. With a 225W TDP, it excels in multi-threaded workloads, making it ideal for data centers and enterprise applications.",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
      Category:'Processor',
      condition:'used',
      subcodition:'Used Pulled',
      price:465,
      quantity:8,
      shortDescription:"(USED Pulled) AMD CPU Processor 32Cores 2.9Ghz 64-Threads"
  },
  {
    id: 3,
    name: "C9130AXI-A",
    brand: "Cisco",
    category:'Access Point',
    condition:"New",
    subcodition:'New Sealed',
    price:410,
    quantity:35,
    shortDescription:'Cisco Catalyst 9130AX Series.',

    image:
      "data:image/jpeg;base64,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",
    description: "The C9130AXI-A refers to a Cisco Catalyst 9130AX Series Access Point. This is a Wi-Fi 6 (802.11ax) access point designed for high-density wireless environments. The AXI indicates an internal antenna model, and the -A specifies a regulatory domain. It offers high throughput, improved reliability, and enhanced security for wireless networks.",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
   
  },
  {
    id: 4,
    name: "C9120AXI-E",
    brand: "Cisco",
    category:'Access Point',
    condition:"New",
    subcodition:'New Sealed',
    price:908,
    quantity:20,
    shortDescription:'C9120AX Internal 802.11ax 4x4:4 MIMO;IOT;BT5;mGig;USB;RHL.      ',

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR49ZmbvO6ihC0so1ib06AX7S2hED9vkeY-g&s",
    description:
      "The C9120AXI-E is a Cisco Catalyst 9120AX Series Wi-Fi 6 access point, designed to provide high-performance wireless connectivity. It features internal antennas and supports 4x4:4 MIMO, enhancing network capacity and efficiency. This access point is built for high-density environments, offering advanced features like OFDMA and MU-MIMO to optimize wireless performance. It's a key component for modern networks requiring reliable and fast Wi-Fi 6 connectivity.",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    
  },
  {
    id: 5,
    name: "AIR-AP1041N-A-K9",
    brand: "Cisco",
    category:'Access Point',
    condition:"New",
    subcodition:'Renew',
    price:130,
    quantity:10,
    shortDescription:'Cisco 1040 Series Access Point',
    image:
      "https://www.cisco.com/c/dam/assets/support/product-images/series/routers-small-business-rv-series-routers.jpg/_jcr_content/renditions/routers-small-business-rv-series-routers-600x220.jpg",
    description: "The AIR-AP1041N-A-K9 is a Cisco Aironet 1040 Series access point, designed to provide 802.11n wireless connectivity. It's a single-band device, operating on the 2.4 GHz frequency, and intended for indoor enterprise environments. This access point offers a cost-effective solution for small to medium-sized businesses needing basic wireless network access. It supports both controller-based and standalone deployments, providing flexibility in network design.",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    
  },
  {
    id: 6,
    name: "AIR-AP2802E-E-K9",
    brand: "Cisco",
    category:'Access Point',
    condition:"Used",
    subcodition:'Grade B',
    price:145,
    quantity:10,
    shortDescription:'(80% NEW) 802.11ac W2 AP w/CA; 4x4:3; Ext Ant; 2xGbE, E Domain.',
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBrV1gJcyZfCrdHEIeRg3Zk1xeOkXninhCw&s",
    description:
      "The AIR-AP2802E-E-K9 is a Cisco Aironet 2800 Series Access Point. Specifically, the E indicates it uses external antennas, and the E-K9 signifies its regulatory domain. This access point supports 802.11ac Wave 2, providing high-density wireless connectivity. Its designed for enterprise environments requiring robust Wi-Fi.",
    thumbnail:
      "https://www.networktigers.com/cdn/shop/files/cisco-AIR-AP2802E-A-K9_360x.jpg?v=1707740949",
    
  },
  {
    id: 7,
    name: "AIR-AP3802I-H-K9",
    brand: "Cisco",
    category:'Access Point',
    condition:"Used",
    subcodition:'Grade A',
    price:140,
    quantity:250,
    shortDescription:'(80-90% NEW) 802.11ac W2 AP Internal Antennas H Domain',
    image: "https://itn.com.pk/wp-content/uploads/2024/01/air-ap3802i-h-k9.png",
    description: "AIR-AP3802I-H-K9 specifies a Cisco Aironet 3800 Series Access Point. The I indicates it uses internal antennas for simplified deployment. The H denotes a specific regulatory domain, often for Japan. The K9 signifies a fully licensed product with comprehensive features. This access point is designed for high-density indoor environments requiring robust wireless connectivity.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMLWn-Gq0EbRsRd88dxZ9kah4b28xMlyqi9A&s", 
    
  },
  
  {
    id: 8,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 9,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 10,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 11,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 12,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 13,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
  },
  {
    id: 14,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
    thumbnail:
      "https://manuals.plus/wp-content/uploads/2021/01/Cisco-Model-DPC3008-DOCSIS-3.0-8x4-Cable-Modem-Datasheet-e1611310542111.jpg?ezimgfmt=rs:412x659/rscb1/ng:webp/ngcb1",
    category: "Router",
    shortDescription:
      "(USED Pulled) AMD CPU Processor 32Cores 2.9Ghz 64-Threads",
  },
  {
    id: 15,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 16,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 18,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 19,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 20,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 21,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 22,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 23,
    name: "Switch Pro",
    brand: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Advanced network switch",
  },
  {
    id: 24,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  {
    id: 25,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  {
    id: 26,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  {
    id: 27,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  {
    id: 28,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  {
    id: 29,
    name: "FiberOptic",
    brand: "Huawei",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&",
    description: "Top-quality fiber optic cable",
  },
  //  name: "FiberOptic", brand: "Huawei", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUuu6KHt9Z6Kh8tiEE95szJ2_4LmDaOosTw&", description: "Top-quality fiber optic cable" },
];

export default products;
