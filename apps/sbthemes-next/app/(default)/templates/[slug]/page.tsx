import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import FilteredTemplateList from '@/components/custom/filtered-template-list'
import TemplateCard from '@/components/custom/template-card'
import helper from '@/lib/helper'
import { IProduct } from '@/types/product'
import { ITemplates } from '@/types/templates'

const technologies = {
    nextjs: {
        name: 'Next.js',
        meta_description:
            'Browse free and premium Next.js templates and themes for agencies, dashboards, SaaS, and landing pages. Built with Tailwind CSS and React.',
        content: `
            <h2>Explore high quality free & premium Next.js templates for every web project</h2>

            <p>At sbthemes, we offer a growing collection of expertly crafted Next.js templates and Next.js themes designed to help developers, startups, and <strong>creative agencies</strong> build modern, responsive, and performance-optimized websites faster. Whether you’re launching a landing page, a portfolio, or a full-scale web application, our templates give you a professional starting point with all the essentials baked in.</p>

            <p>Our Next JS templates are built with the latest web technologies, including React 18 or React 19, Tailwind CSS, and ShadCN UI, ensuring fast load times, modular design, and scalability. Each Next.js website template is fully responsive, SEO optimized, and comes with support for light and dark mode to deliver a dynamic user experience across all devices.</p>

            <h2>Why choose sbthemes’ Next.js templates?</h2>
            <ul>
                <li>Clean and modern design</li>
                <li>Supports dark/light mode out of the box</li>
                <li>Built on Next.js with the latest React versions</li>
                <li>Integrated with <a href="/templates/tailwind-css" target="_blank">Tailwind CSS</a> for rapid UI development</li>
                <li>Smooth scrolling and animation-ready</li>
                <li>Ideal for landing pages, portfolios, dashboards, and more</li>
                <li>Ready-to-use for agencies, admin dashboards, blogs, and startups</li>
                <li>Simple to customize with reusable components and pre-built sections</li>
            </ul>

            <p>Looking for a Next JS agency template, a powerful admin dashboard, or just a highly flexible Next.js theme? We’ve got you covered.</p>

            <p>Every Next JS template in our library is crafted with attention to performance, accessibility, and developer-friendly architecture—making it easy to launch and scale your next web project with confidence. Whether you're creating high-impact marketing sites or building apps for your creative agency, sbthemes offers the right tools to get started quickly.</p>
    `,
        faqs: [
            {
                question:
                    'What are Next.js templates and why should I use them?',
                answer: 'Next.js templates are pre-built project starters that help developers quickly launch web applications using the powerful Next.js framework. These Nextjs templates provide ready-to-use layouts and components that speed up development while ensuring best practices in performance, SEO, and scalability.',
            },
            {
                question:
                    'Are your Nextjs themes compatible with React 18 or React 19?',
                answer: 'Yes, all of our Nextjs themes and Nextjs templates are built on the latest technologies, including React 18 or React 19. This guarantees optimal performance, concurrency support, and future-proof architecture for your projects.',
            },
            {
                question:
                    "Do sbthemes' Nextjs templates support dark and light mode?",
                answer: 'Absolutely. Many of our Nextjs templates and Nextjs themes come with built-in support for dark and light mode toggling, powered by Tailwind CSS and ShadCN UI components—offering a seamless experience across devices and themes.',
            },
            {
                question:
                    'Can I use these Nextjs templates for commercial projects?',
                answer: 'Yes! All free and premium Nextjs templates and next js templates listed on sbthemes can be used for both personal and commercial web projects. Just be sure to review the individual license for each template to confirm usage rights.',
            },
            {
                question:
                    'Which Nextjs template is best for creating an agency or admin dashboard website?',
                answer: "If you're looking for a next js template suited for agencies, check out options like Estatelis or Viblog for polished portfolios or content-driven designs. For an admin dashboard, NexaDash is our top-rated Nextjs template featuring a modern UI, responsive layout, and Tailwind CSS integration.",
            },
        ],
    },
    html5: {
        name: 'HTML5',
        meta_description:
            'Discover free and premium HTML5 templates with modern, responsive design. Perfect for landing pages, portfolios, easy to customize and SEO optimized.',
        content: `
            <h2>HTML5 templates – free & responsive website designs</h2>
            <p>Explore our collection of HTML5 templates designed to help you launch faster with clean code, modern layouts, and responsive design. Whether you're building a personal portfolio, business site, startup landing page, or blog, these HTML5 website templates are crafted for performance, scalability, and clean web design.</p>

            <p>Each template follows best practices for web standards, accessibility, and SEO. Built with semantic markup and lightweight assets, our free HTML5 templates are ideal for developers and designers seeking a head start on their next project. These web templates often include example JavaScript code and structured <code>meta http-equiv</code> tags to enhance site behavior and compatibility.</p>

            <h2>Why choose our HTML5 website templates?</h2>
            <ul>
            <li>⚡ Clean & Semantic HTML Code – Easy to read, well-organized, and developer-friendly.</li>
            <li>📱 HTML5 Responsive Templates – Mobile-first layouts that look great on all devices.</li>
            <li>🌍 SEO-Ready Structure – Optimized for fast load times and better search rankings.</li>
            <li>🧩 Free UI Kits & Page Sections – Use pre-built components to create multi-page or one-page websites easily.</li>
            <li>🎨 Modern & Minimalist Design – Clean layouts that follow today’s visual trends.</li>
            <li>🔄 Easy to Customize – Modify content, colors, and sections with minimal effort.</li>
            </ul>

            <h2>Use cases for HTML5 templates</h2>
            <ul>
            <li>Landing pages for apps, products, or events</li>
            <li>Portfolio websites for designers, freelancers, and creatives</li>
            <li>Corporate and agency websites</li>
            <li>Startups and SaaS product pages</li>
            <li>Blogs, resumes, and documentation</li>
            <li>Multi-page websites with contact forms, pricing tables, and HTML5 themes integration</li>
            </ul>

            <p>All of our HTML templates are built using modern HTML5 standards with flexibility and performance in mind. You can customize layouts, plug in your content, and launch in no time – no framework or complex build tools required. The templates are ideal for experimenting with JavaScript code snippets or extending layouts for any kind of web design project.</p>

            <h2>Download & build faster with free HTML5 templates</h2>
            <p>Kickstart your next project using our handpicked free HTML5 website templates. Whether you’re building from scratch or prototyping a new idea, these HTML5 responsive templates offer a reliable foundation to get online quickly with quality design, valid markup, and structured metadata using meta http-equiv tags.</p>

            <p>Browse and download your favorite HTML5 template today – optimized, accessible, and ready to go. These web templates give you full control while following modern web development practices and HTML5 themes conventions.</p>
`,
        faqs: [
            {
                question: 'What are HTML5 templates and how do they help?',
                answer: 'HTML5 templates are pre-built website layouts that use modern HTML5 standards. They help developers quickly launch responsive and accessible websites without building from scratch.',
            },
            {
                question: 'Are your HTML5 templates fully responsive?',
                answer: 'Yes, all our HTML5 templates are fully responsive and mobile-first. They adapt seamlessly to all screen sizes, from desktops to smartphones, ensuring a consistent user experience.',
            },
            {
                question:
                    'Can I use free HTML5 templates for commercial projects?',
                answer: 'Absolutely! Our free HTML5 templates are available for both personal and commercial use. Each download includes clear licensing details for your peace of mind.',
            },
            {
                question: 'Do HTML5 templates include CSS or UI kits?',
                answer: 'Yes, most HTML5 templates come with built-in CSS styles or UI kits. These help speed up development by providing reusable components and clean, consistent design.',
            },
            {
                question: 'How do I customize an HTML5 website template?',
                answer: 'You can customize HTML5 templates by editing the HTML and CSS files directly. They’re framework-agnostic, lightweight, and easy to modify based on your project’s needs.',
            },
        ],
    },
    react: {
        name: 'React',
        meta_description:
            'Explore free and premium React templates for modern web projects. Built with React 18+, Tailwind CSS, fully customizable, and SEO optimized.',
        content: `
            <h2>Free & premium React templates for modern web apps</h2>
            <p>
                Explore our handpicked collection of React templates and themes built for modern development. Whether you're launching a web app, admin dashboard, SaaS product, or portfolio, our <strong>React JS templates</strong> are designed to boost productivity and scalability.
            </p>

            <p>
                All templates are built with modern React best practices, including support for <strong>React 18</strong> and upcoming <strong>React 19</strong> features. From clean JSX syntax to component-based architecture and optional <strong>TypeScript</strong> support, these templates provide a solid foundation for your next project.
            </p>

            <h2>Why use our React templates?</h2>
            <ul>
                <li><strong>🧩 Component-Based Architecture</strong> – Clean and reusable code for scalability.</li>
                <li><strong>🌗 Light and Dark Mode</strong> – Easily toggle themes with built-in support.</li>
                <li><strong>⚛️ Built with React 18+</strong> – Compatible with the latest React JS ecosystem.</li>
                <li><strong>📦 Pre-Built UI Kits</strong> – Save time with ready-made components and pages.</li>
                <li><strong>⚡ Performance Optimized</strong> – Fast loading, SEO-ready, and best practices applied.</li>
                <li><strong>🎨 Tailwind CSS Integration</strong> – Utility-first styling for full design flexibility.</li>
                <li><strong>🛠️ Developer Friendly</strong> – Clean JSX, routing support, and minimal boilerplate.</li>
            </ul>

            <h2>Use cases for React JS templates</h2>
            <ul>
                <li>Admin dashboards</li>
                <li>SaaS product landing pages</li>
                <li>Portfolio websites</li>
                <li>CRM/HRM systems</li>
                <li>Startup MVPs</li>
                <li>Documentation & blog templates</li>
            </ul>

            <p>
                Whether you're a frontend developer, startup founder, or agency, our free React templates and UI kits give you a head start with clean, production-ready code. These <strong>React website templates</strong> are ideal for launching fast, accessible, and responsive web apps.
            </p>

            <h2>Start building with React today</h2>
            <p>
                Browse and download free and premium React templates tailored for high performance and modern design. With support for dark mode, <strong>Tailwind CSS</strong>, and modular architecture, you can build fast and maintainable web apps with ease.
            </p>`,
        faqs: [
            {
                question:
                    'Which React version are these templates compatible with?',
                answer: 'All templates are fully compatible with React 18 and are tested for forward compatibility with React 19, ensuring your projects stay up to date with the latest React features and improvements.',
            },
            {
                question:
                    'Do your React templates support Tailwind CSS and utility-first styling?',
                answer: 'Yes, most of our React templates are built using Tailwind CSS, enabling utility-first, responsive, and scalable UI development out of the box.',
            },
            {
                question:
                    'Can I use these React templates for commercial or client projects?',
                answer: 'Yes, both free and premium React templates are suitable for commercial use. Please refer to each template’s license details to ensure compliance with usage terms.',
            },
            {
                question:
                    'Do the React templates come with dark mode and accessibility support?',
                answer: 'Many of our templates include built-in light and dark mode toggles and follow accessibility best practices, ensuring your apps are inclusive and user-friendly.',
            },
            {
                question:
                    'What types of web projects are best suited for your React templates?',
                answer: 'Our React templates are ideal for building admin dashboards, SaaS apps, portfolios, landing pages, and startup MVPs — giving developers a clean, scalable foundation for modern web apps.',
            },
        ],
    },
    vuejs: {
        name: 'Vue.js',
        meta_description:
            'Design beautiful websites effortlessly. Our Vue.js templates are stylish, easy to use, and crafted for your success.',
        content: `
            <h2>Vue.js templates – free & premium Vue 3 website themes</h2>
            <p>Explore a growing collection of modern Vue.js templates built with the Vue 3 framework and Composition API. Whether you're launching a startup, building an admin dashboard, or creating a landing page, our Vue and Nuxt.js templates help you get started faster with clean code and reusable components.</p>

            <p>Each template is designed with scalability and performance in mind. From responsive Vue website templates to Nuxt.js templates with SSR support, our offerings are developer-friendly, lightweight, and optimized for speed. Enjoy full control over your UI using Tailwind CSS and support for dark and light mode.</p>

            <h2>Why developers choose our Vue 3 templates</h2>
            <ul>
            <li><strong>⚡ Built with Vue 3 & Composition API</strong> – Embrace the latest features of the Vue 3 ecosystem for better maintainability and reactivity.</li>
            <li><strong>📦 Free Vue.js Templates</strong> – Save time with pre-built layouts for websites, admin panels, and SaaS apps.</li>
            <li><strong>🎨 Tailwind CSS Integrated</strong> – Utility-first styling makes design customization fast and flexible.</li>
            <li><strong>🌗 Light & Dark Mode</strong> – Seamless theme toggling with accessibility considerations.</li>
            <li><strong>📱 Fully Responsive</strong> – Mobile-first templates designed for every screen size.</li>
            <li><strong>🚀 SSR-Ready Nuxt.js Templates</strong> – Improve SEO and page load time with Nuxt.js support.</li>
            <li><strong>🛠 Developer-Friendly</strong> – Clean code, modular structure, and reusable Vue components.</li>
            </ul>

            <p>Whether you're working on a commercial project or a side hustle, our Vue.js templates are the perfect starting point. Build beautiful, fast-loading, and scalable web applications without starting from scratch.</p>

            <p>Download free Vue templates or explore premium Nuxt and Vue 3 themes — optimized for developers, startups, and businesses of all kinds.</p>
        `,
        faqs: [
            {
                question: 'Are your Vue.js templates compatible with Vue 3?',
                answer: 'Yes, all templates are built with the latest Vue 3 framework using Composition API for better reactivity, maintainability, and modern best practices.',
            },
            {
                question: 'Do your Vue templates support Nuxt.js?',
                answer: 'Many of our Vue.js templates include versions built with Nuxt.js for server-side rendering (SSR), better SEO, and lightning-fast performance.',
            },
            {
                question:
                    'Are these Vue templates responsive and mobile-friendly?',
                answer: 'Absolutely. All our Vue templates follow mobile-first design principles and are fully responsive, ensuring a seamless experience on all screen sizes.',
            },
            {
                question: 'Can I use Tailwind CSS with your Vue templates?',
                answer: 'Yes, most Vue templates come pre-integrated with Tailwind CSS, enabling fast UI customization using utility-first classes.',
            },
            {
                question: 'Are the Vue templates free for commercial use?',
                answer: 'Many of our Vue.js templates are completely free and can be used in personal and commercial projects. Please check the license details for each template before use.',
            },
        ],
    },
    nuxt: {
        name: 'Nuxt',
        meta_description:
            'Boost your projects with Nuxt templates. Improve performance, enhance SEO – create your online success story.',
        content: `
            <h2>Nuxt.js templates – modern & performance-optimized website starters</h2>
            <p>Discover a powerful collection of Nuxt.js templates crafted to help you build fast, SEO-friendly websites with server-side rendering (SSR) and static site generation (SSG). Whether you need a sleek admin dashboard, a stunning landing page, or a full-featured website, our Nuxt templates provide a scalable, developer-friendly foundation.</p>

            <p>Built on Vue 3 and leveraging the Composition API, these Nuxt.js templates are fully responsive, support dark and light modes, and integrate seamlessly with Tailwind CSS for easy customization. Get started quickly with pre-built pages and reusable components designed for modern web projects.</p>

            <h2>Why choose our Nuxt.js templates?</h2>
            <ul>
            <li><strong>⚡ SSR & SSG Ready</strong> – Improve SEO and load times with server-side rendering and static generation.</li>
            <li><strong>📦 Built on Vue 3 & Composition API</strong> – Leverage the latest Vue features for maintainable code.</li>
            <li><strong>🎨 Tailwind CSS Integration</strong> – Fast styling with utility-first classes for complete design control.</li>
            <li><strong>🌗 Light & Dark Mode</strong> – User-friendly themes with accessibility support.</li>
            <li><strong>📱 Fully Responsive</strong> – Mobile-first templates optimized for all devices.</li>
            <li><strong>🛠 Developer-Friendly</strong> – Clean, modular code with reusable components and easy customization.</li>
            <li><strong>🚀 Pre-Built Pages & Layouts</strong> – Jumpstart your project with ready-made UI blocks and navigation.</li>
            </ul>

            <p>Our Nuxt.js templates are perfect for startups, agencies, SaaS platforms, and personal projects. Download free and premium options that accelerate your development process and help you deliver high-quality Vue-powered websites.</p>
        `,
        faqs: [
            {
                question:
                    'What makes Nuxt.js templates different from standard Vue templates?',
                answer: 'Nuxt.js templates provide built-in server-side rendering (SSR) and static site generation (SSG), which improve SEO, initial page load speed, and overall user experience compared to client-only Vue templates.',
            },
            {
                question:
                    'Are these Nuxt templates compatible with Vue 3 and Composition API?',
                answer: 'Yes, our Nuxt templates are built on Vue 3 and fully support the Composition API, giving developers modern reactive and maintainable coding patterns.',
            },
            {
                question:
                    'Can I customize the design of Nuxt.js templates easily?',
                answer: 'Absolutely. Most Nuxt.js templates include Tailwind CSS integration, allowing you to customize styling quickly using utility-first CSS classes without writing much custom CSS.',
            },
            {
                question:
                    'Do these Nuxt templates support light and dark mode?',
                answer: 'Yes, our Nuxt templates support seamless toggling between light and dark themes, designed with accessibility and user preference in mind.',
            },
            {
                question:
                    'Are the Nuxt.js templates suitable for production projects?',
                answer: 'Yes, all our Nuxt templates are built with best practices in mind, optimized for performance, SEO, and scalability to be production-ready for commercial or personal use.',
            },
        ],
    },
    figma: {
        name: 'Figma',
        meta_description:
            'Design beautiful websites effortlessly. Our Figma templates are stylish, easy to use, and crafted for your success.',
        content: `
        <h2>Figma templates – stunning UI kits and design systems for modern interfaces</h2>
        <p>Explore our extensive collection of Figma templates designed for UI/UX designers, product teams, and agencies looking to speed up their design workflow. Whether you’re crafting landing pages, dashboards, mobile apps, or wireframes, these free and premium Figma templates offer pixel-perfect, customizable components built for collaboration and prototyping.</p>

        <p>Our Figma UI kits come with modern, clean design systems that help you maintain consistency across projects while allowing flexibility to tailor designs to your brand. Designed for responsive interfaces, these templates make it easy to create user-friendly experiences optimized for all screen sizes.</p>

        <h2>Why use our Figma templates?</h2>
        <ul>
        <li><strong>🎨 Modern UI Kits & Design Systems</strong> – Pre-built components ensure consistent and scalable design.</li>
        <li><strong>⚡ Boost Design Productivity</strong> – Jumpstart your projects and reduce repetitive tasks.</li>
        <li><strong>🤝 Collaboration Ready</strong> – Work seamlessly with teams in real-time using Figma’s collaboration features.</li>
        <li><strong>📐 Responsive & Customizable</strong> – Easily adjust layouts and components for mobile and desktop.</li>
        <li><strong>🔄 Prototyping Support</strong> – Create interactive prototypes to visualize user flows.</li>
        <li><strong>📂 Organized & Clean Files</strong> – Well-structured layers and naming conventions for easy navigation.</li>
        <li><strong>💡 Design Inspiration</strong> – Access diverse styles from minimalistic to vibrant themes to spark creativity.</li>
        </ul>

        <p>Whether you're a freelancer, startup, or large agency, our Figma templates are the perfect starting point to create professional and engaging digital products faster and more efficiently.</p>
        `,
        faqs: [
            {
                question:
                    'What are Figma templates and why should designers use them?',
                answer: 'Figma templates are pre-designed files that include UI components, layouts, and design systems which help designers speed up their workflow by providing a ready-made foundation for projects.',
            },
            {
                question: 'Can I customize Figma templates to match my brand?',
                answer: 'Yes, Figma templates are fully customizable. You can adjust colors, typography, layouts, and components to perfectly align with your brand identity.',
            },
            {
                question: 'Are Figma templates suitable for responsive design?',
                answer: 'Absolutely. Most Figma templates are created with responsive design principles, allowing you to adapt your designs for various screen sizes and devices.',
            },
            {
                question:
                    'How do Figma templates improve collaboration in design teams?',
                answer: 'Figma’s cloud-based platform allows multiple users to work on the same design file in real-time, making it easier for teams to collaborate, give feedback, and iterate quickly.',
            },
            {
                question:
                    'Can I use Figma templates for prototyping and user testing?',
                answer: 'Yes, Figma templates support prototyping features that let you create interactive user flows to test and demonstrate design concepts before development.',
            },
        ],
    },
    alpinejs: {
        name: 'Alpine.js',
        meta_description:
            'Design beautiful websites effortlessly. Our Alpine.js templates are stylish, easy to use, and crafted for your success.',
        content: `
            <h2>Alpine.js templates – lightweight and reactive UI components for modern web development</h2>
            <p>Discover our collection of Alpine.js templates designed for developers who want to build dynamic, reactive user interfaces with minimal JavaScript. Alpine.js offers a lightweight, declarative approach to adding interactivity to your web projects without the overhead of larger frameworks.</p>

            <p>Whether you’re building dashboards, landing pages, or interactive UI components, our free and premium Alpine.js templates provide clean, modular code that integrates seamlessly with Tailwind CSS and other modern tools. Enjoy fast load times, simple state management, and an easy learning curve with these starter templates.</p>

            <h2>Why choose our Alpine.js templates?</h2>
            <ul>
            <li><strong>⚡ Lightweight and Minimal</strong> – Add reactivity to your site with less than 10KB of JavaScript.</li>
            <li><strong>📦 Easy Integration</strong> – Works perfectly alongside Tailwind CSS and vanilla JavaScript.</li>
            <li><strong>🔧 Simple Declarative Syntax</strong> – Write reactive code directly in your HTML with intuitive directives.</li>
            <li><strong>🛠️ Modular and Extendable</strong> – Build and customize components without complex tooling.</li>
            <li><strong>🚀 Fast Load Times</strong> – Minimal dependencies result in blazing-fast websites.</li>
            <li><strong>📱 Responsive and Accessible</strong> – Templates designed with responsive layouts and accessibility best practices.</li>
            <li><strong>🔄 Ideal for Progressive Enhancement</strong> – Enhance static HTML with interactive behaviors without full JavaScript frameworks.</li>
            </ul>

            <p>Perfect for developers who want simple but powerful reactive UI solutions, our Alpine.js templates offer a smooth starting point for projects that prioritize performance and ease of use.</p>
        `,
        faqs: [
            {
                question:
                    'What makes Alpine.js different from other JavaScript frameworks?',
                answer: 'Alpine.js is a lightweight framework that offers reactive and declarative UI behavior with minimal JavaScript, making it ideal for adding interactivity without the overhead of larger frameworks like React or Vue.',
            },
            {
                question: 'Can Alpine.js templates be used with Tailwind CSS?',
                answer: 'Yes, Alpine.js integrates seamlessly with Tailwind CSS, allowing developers to create fully responsive and interactive UI components with minimal setup.',
            },
            {
                question: 'Are Alpine.js templates suitable for beginners?',
                answer: 'Absolutely. Alpine.js uses simple, declarative syntax that is easy to learn for developers familiar with HTML and basic JavaScript, making it a great choice for beginners.',
            },
            {
                question:
                    'How do Alpine.js templates help improve website performance?',
                answer: 'Because Alpine.js has a small bundle size and minimal dependencies, templates built with it load faster and consume fewer resources, resulting in better overall website performance.',
            },
            {
                question:
                    'Can Alpine.js templates be extended or customized easily?',
                answer: 'Yes, Alpine.js is designed to be modular and flexible, allowing developers to extend and customize templates according to project requirements without complex build tools.',
            },
        ],
    },
    angularjs: {
        name: 'AngularJs',
        meta_description:
            'Enhance your website with AngularJs templates. Strong, scalable, and full of features – unlock AngularJs for your digital journey.',
        content: `
        <h2>AngularJS templates – robust and scalable solutions for dynamic web applications</h2>
        <p>Explore our curated collection of AngularJS templates designed for developers building scalable and dynamic single-page applications (SPAs). AngularJS, a powerful JavaScript MVC framework, enables you to create rich, interactive user experiences with two-way data binding and modular architecture.</p>

        <p>Our free and premium AngularJS templates come with clean, maintainable code, built-in directives, and reusable UI components to help you quickly prototype and launch your web projects. Whether you’re building admin dashboards, business portals, or responsive landing pages, these templates offer a solid foundation with Bootstrap and other modern frontend tools.</p>

        <h2>Why choose our AngularJS templates?</h2>
        <ul>
        <li><strong>🛠️ Modular and Component-Based</strong> – Easily manage complex projects with reusable components and services.</li>
        <li><strong>🔄 Two-Way Data Binding</strong> – Keep your UI and data in sync seamlessly with AngularJS’s powerful binding.</li>
        <li><strong>⚙️ Built-in Directives & Dependency Injection</strong> – Simplify development with AngularJS’s rich feature set.</li>
        <li><strong>📱 Responsive & Mobile-Friendly</strong> – Templates optimized for all devices with Bootstrap integration.</li>
        <li><strong>🚀 Scalable Architecture</strong> – Perfect for enterprise applications and growing projects.</li>
        <li><strong>💻 Developer Friendly</strong> – Well-documented and easy to customize for your specific needs.</li>
        <li><strong>🔧 Performance Optimized</strong> – Efficient rendering and smooth user experience across browsers.</li>
        </ul>

        <p>Whether you are a startup or an enterprise, our AngularJS templates provide a powerful and flexible starting point to accelerate your web development workflow.</p>
        `,
        faqs: [
            {
                question:
                    'What are AngularJS templates and how do they help in development?',
                answer: 'AngularJS templates are pre-built project layouts and UI components that simplify building dynamic single-page applications by leveraging AngularJS’s MVC architecture and two-way data binding.',
            },
            {
                question:
                    'Can I use AngularJS templates to build admin dashboards?',
                answer: 'Yes, many AngularJS templates are specifically designed for admin dashboards, providing reusable components, responsive design, and data visualization integrations.',
            },
            {
                question: 'Are AngularJS templates suitable for beginners?',
                answer: 'AngularJS has a moderate learning curve, but its templates come with well-structured code and documentation, which can help beginners understand and build scalable web apps.',
            },
            {
                question:
                    'How do AngularJS templates improve project scalability?',
                answer: 'With modular components, dependency injection, and clear separation of concerns, AngularJS templates make it easier to manage and scale your application as it grows.',
            },
            {
                question:
                    'Can I customize AngularJS templates to fit my brand and project needs?',
                answer: 'Absolutely. AngularJS templates are built with customization in mind, allowing developers to modify styles, components, and functionality to meet specific project requirements.',
            },
        ],
    },
    'tailwind-css': {
        name: 'Tailwind CSS',
        meta_description:
            'Design beautiful websites effortlessly. Our Tailwind CSS templates are stylish, easy to use, and crafted for your success.',
        content: `
            <h2>Tailwind CSS templates – free & modern website UI kits</h2>
            <p>Discover our curated collection of <strong>free Tailwind CSS</strong> templates – clean, responsive, and designed for performance. Whether you’re building a SaaS dashboard, a marketing landing page, a portfolio, or a blog, these templates are fully compatible with the <strong>Tailwind CSS framework</strong>, enabling you to move fast with a modern and flexible codebase.</p>

            <p>Our <strong>free Tailwind CSS templates</strong> are ideal for developers, startups, and designers looking to save time while following best practices in UI/UX. Each <strong>Tailwind CSS template</strong> serves as a powerful <strong>starting point</strong> for your next web project—easily extendable and fully responsive out of the box.</p>

            <h2>Why choose our Tailwind CSS templates?</h2>
            <ul>
                <li><strong>⚡ Built on Tailwind CSS Framework</strong> – Fast styling and complete customization with utility classes.</li>
                <li><strong>🧱 Free UI Kits & Site Templates</strong> – Ready-to-use layouts for personal and commercial use.</li>
                <li><strong>🌗 Light and Dark Mode Support</strong> – Seamless theme switching with accessibility in mind.</li>
                <li><strong>🧑‍💻 Developer-Friendly</strong> – Clean code, responsive grids, and easily extendable components.</li>
                <li><strong>📱 Fully Responsive</strong> – Mobile-first design using modern CSS utility features.</li>
                <li><strong>🧩 Tailwind CSS Theme Options</strong> – Choose from multiple <strong>Tailwind CSS theme</strong> to match your brand.</li>
                <li><strong>🔌 Integrated with Latest Tech</strong> – Compatible with React, Next.js, and Alpine.js projects.</li>
            </ul>

            <h2>Free Tailwind UI templates for all use cases</h2>
            <ul>
                <li>Landing pages</li>
                <li>Admin dashboards</li>
                <li>Startup and SaaS websites</li>
                <li>Portfolios and resumes</li>
                <li>Blogs and documentation</li>
                <li>E-commerce layouts to <strong>add products</strong> with ease</li>
            </ul>

            <p>Every <strong>Tailwind CSS theme</strong> is crafted to help you build beautiful interfaces without writing custom CSS. You can easily plug in your content, <strong>add products</strong>, tweak design tokens, and deploy your site faster than ever.</p>

            <h2>Download & start building with Tailwind today</h2>

            <p>Whether you’re exploring a new project or improving an existing one, our collection of <strong>free Tailwind CSS</strong> templates, UI kits, and site templates will give you a professional <strong>starting point</strong>. These templates follow modern frontend practices and are fully optimized for speed, accessibility, and developer experience.</p>

            <p>Browse, preview, and download the best <strong>Tailwind CSS UI</strong> for your next web app — no bloated stylesheets, just clean, semantic, and production-ready components.</p>
        `,
        faqs: [
            {
                question: 'What is a Tailwind CSS template?',
                answer: 'A Tailwind CSS template is a pre-built website layout or UI component kit that uses the Tailwind CSS framework. These templates allow you to quickly build responsive and customizable interfaces using utility-first CSS classes.',
            },
            {
                question: 'Are the Tailwind CSS templates free to use?',
                answer: "Yes, most templates listed on sbthemes are free for both personal and commercial use. Always check the license details on each template's page before using them in production.",
            },
            {
                question:
                    'Can I use Tailwind templates in a Next.js or React project?',
                answer: 'Absolutely! Our Tailwind themes are designed to be framework-agnostic and can be used in Next.js, React, Vue, or even plain HTML projects. They are fully compatible with React 18 or React 19.',
            },
            {
                question: 'Do these templates support dark mode?',
                answer: 'Yes, many of our Tailwind CSS themes come with built-in support for dark and light modes. You can easily toggle between them with class-based theming or JavaScript.',
            },
            {
                question: 'Are Tailwind UI kits SEO optimized?',
                answer: 'Yes, the Tailwind UI templates on sbthemes follow semantic HTML best practices and are optimized for fast loading, accessibility, and SEO to help improve search visibility.',
            },
        ],
    },
}
interface Props {
    params: { slug: string }
    searchParams: {
        category: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const tech = helper.languages.find(
        (x) => x.query.toLowerCase() === `#${params.slug.toLowerCase()}`,
    )
    if (!tech) return notFound()

    const techData =
        technologies[params.slug as keyof typeof technologies] || null
    if (!techData) return notFound()

    return {
        title: `${techData.name} templates | sbthemes`,
        description: techData.meta_description,
        openGraph: {
            ...helper.openGraphData,
            title: `${tech.name} templates | sbthemes`,
            description: techData.meta_description,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}`,
            type: 'website',
        },
        twitter: {
            title: `${tech.name} templates | sbthemes`,
            description: techData.meta_description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}`,
            },
        },
    }
}

export default function Page({ params, searchParams }: Props) {
    const slug = params.slug.toLowerCase()

    const tech = helper.languages.find(
        (x) => x.query.toLowerCase() === `#${slug}`,
    )

    const techData =
        technologies[params.slug as keyof typeof technologies] || null
    if (!techData) return notFound()

    const categories = searchParams?.category?.split(',') || []
    const templates: IProduct[] = helper.getProducts({
        tech: [tech?.name || ''],
        categories: categories || [],
    })

    if (!tech) {
        return notFound()
    }

    const listItem = []
    for (const template of templates) {
        listItem.push(`{
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "${template?.name}",
                "image": "${process.env.NEXT_PUBLIC_APP_URL}${template?.thumb_url?.src}",
                "description": "${template?.meta_description}",
                "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${template?.slug}",
                "brand": {
                    "@type": "Brand",
                    "name": "sbthemes"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "offerCount": "2",
                    "lowPrice": "${template?.plans?.free?.price || 0}",
                    "highPrice": "${template?.plans?.pro?.price}",
                    "priceCurrency": "USD",
                    "offers": [
                        {
                            "@type": "Offer",
                            "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${template?.slug}",
                            "price": "${template?.plans?.free?.price}",
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        },
                        {
                            "@type": "Offer",
                            "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${template?.slug}",
                            "price": "${template?.plans?.pro?.price}",
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        }
                    ]
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "${template?.reviews?.rating}",
                    "reviewCount": "${template?.reviews?.count}"
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${template?.slug}"
                }
            }`)
    }

    return (
        <div>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <div className="mx-auto w-full p-4">
                    <h1 className="mb-2.5 text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                        {tech.name} templates
                    </h1>
                    <p className="mx-auto max-w-3xl font-medium lg:leading-7">
                        {techData.meta_description}
                    </p>
                </div>
            </div>

            <FilteredTemplateList templates={templates} hideTechFilter={true} />

            {techData.content && (
                <div className="prose mx-auto max-w-screen-lg">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: techData.content,
                        }}
                    />
                </div>
            )}

            {techData.faqs.length > 0 && (
                <section
                    aria-labelledby="faq-heading"
                    className="prose mx-auto mt-14 max-w-screen-lg"
                >
                    <h2 id="faq-heading">Frequently Asked Questions (FAQs)</h2>

                    <dl className="space-y-8">
                        {techData.faqs.map((faq, idx) => (
                            <div key={idx} className="space-y-2">
                                <dt className="text-lg font-medium">
                                    {faq.question}
                                </dt>
                                <dd className="text-gray-700 m-0 p-0">
                                    {faq.answer}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {/* JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: techData.faqs.map((faq) => ({
                            '@type': 'Question',
                            name: faq.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "${tech.name}",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}",
                        "description": "${techData.meta_description}",
                        "inLanguage": "en",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}"
                            },{
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Templates",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/templates"
                            },{
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${tech.name}",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}"
                            }]
                        }
                    }`,
                }}
                key="product-jsonld5"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "${tech.name} templates",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/templates/${params.slug}",
                        "numberOfItems": ${templates.length},
                        "itemListOrder": "ascending",
                        "itemListElement": [${listItem.join(',')}]
                    }`,
                }}
                key="product-jsonld6"
            />
        </div>
    )
}
