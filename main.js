// Portfolio Website JavaScript
// Author: Roshan Dhamala
// Description: Interactive functionality for professional portfolio

// Global Variables
let particles = [];
let backgroundSketch;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeBackground();
    initializeTypedText();
    initializeScrollAnimations();
    initializeNavigation();
    initializeProjectFilter();
    initializeContactForm();
    initializeSkillBars();
});

// Loading Screen
function initializeLoader() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1500);
    });
}

// Background Animation with p5.js
function initializeBackground() {
    backgroundSketch = new p5(function(p) {
        let particles = [];
        let mouse = { x: 0, y: 0 };
        
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.id('background-canvas');
            canvas.parent(document.body);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(1, 3),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update mouse position
            mouse.x = p.mouseX;
            mouse.y = p.mouseY;
            
            // Update and draw particles
            for (let particle of particles) {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Mouse interaction
                let distance = p.dist(mouse.x, mouse.y, particle.x, particle.y);
                if (distance < 100) {
                    particle.opacity = p.map(distance, 0, 100, 1, 0.3);
                } else {
                    particle.opacity = p.lerp(particle.opacity, 0.5, 0.02);
                }
                
                // Draw particle
                p.fill(0, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
                
                // Draw connections
                for (let other of particles) {
                    let d = p.dist(particle.x, particle.y, other.x, other.y);
                    if (d < 80) {
                        p.stroke(0, 255, 255, (1 - d/80) * particle.opacity * 100);
                        p.strokeWeight(0.5);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Typed.js initialization
function initializeTypedText() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'AI Tools Expert',
                'Hardware & Network Engineer',
                'Video Editing Specialist',
                'Digital Solutions Provider',
                'Technology Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Project Filter functionality
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        anime({
                            targets: bar,
                            width: width,
                            duration: 1500,
                            easing: 'easeOutQuad'
                        });
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillObserver.observe(skillSection);
}

// Contact Form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showNotification('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Form validation
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClass(type)}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-lg">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => notification.remove()
            });
        }
    }, 5000);
}

// Get notification CSS class
function getNotificationClass(type) {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-black';
        default:
            return 'bg-cyan-500 text-white';
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function downloadCV() {
    // Simulate CV download
    showNotification('CV download feature coming soon!', 'info');
}

// Project detail functions
function showProjectDetails(projectId) {
    const projectDetails = {
        'ai-content-generator': {
            title: 'AI Content Generator',
            description: 'A comprehensive content generation system that leverages multiple AI tools to create engaging content for various platforms.',
            features: [
                'Automated blog post generation',
                'Social media content creation',
                'SEO optimization',
                'Multi-language support',
                'Content scheduling'
            ],
            technologies: ['ChatGPT API', 'Midjourney API', 'Python', 'React', 'Node.js'],
            image: 'https://kimi-web-img.moonshot.cn/img/static.vecteezy.com/96c6e66ec45c4c23f747a38bc8842860b2c85e8d.jpg'
        },
        'office-network': {
            title: 'Office Network Infrastructure',
            description: 'Complete network solution for small to medium offices with enhanced security and performance optimization.',
            features: [
                'Network design and implementation',
                'VPN configuration and management',
                'Firewall setup and security',
                'Bandwidth optimization',
                'Remote access solutions'
            ],
            technologies: ['Cisco', 'Mikrotik', 'OpenVPN', 'WireGuard', 'pfSense'],
            image: 'https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/b992aa8b40f51d3a81a94c6c674c6eef2a7a5e10.jpg'
        },
        'brand-identity': {
            title: 'Brand Identity Package',
            description: 'Complete brand identity design solution including all visual elements for consistent brand presence.',
            features: [
                'Logo design and variations',
                'Business card design',
                'Social media templates',
                'Brand guidelines document',
                'Marketing collateral'
            ],
            technologies: ['Canva Pro', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
            image: 'https://kimi-web-img.moonshot.cn/img/wp-media-design-studio.s3.us-east-1.amazonaws.com/438c39a4d4f49b4ead320ca21891ef2f4e4af188.jpeg'
        },
        'promotional-videos': {
            title: 'Promotional Video Series',
            description: 'Professional video editing and production services for businesses and content creators.',
            features: [
                'Video editing and post-production',
                'Color grading and correction',
                'Motion graphics and animations',
                'Audio enhancement',
                'Multi-format export'
            ],
            technologies: ['CapCut Pro', 'YouCut', 'InShot', 'Adobe Premiere', 'After Effects'],
            image: 'https://kimi-web-img.moonshot.cn/img/images.stockcake.com/cf6364268f1f23cb899b2849c344d83c2880d09a.jpg'
        },
        'ai-dashboard': {
            title: 'AI Tools Dashboard',
            description: 'Unified dashboard for managing multiple AI tools and automating workflows for enhanced productivity.',
            features: [
                'Multi-AI tool integration',
                'Automated workflow management',
                'API management and monitoring',
                'Usage analytics and reporting',
                'Team collaboration tools'
            ],
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Multiple AI APIs'],
            image: 'https://kimi-web-img.moonshot.cn/img/web-camp.io/302a5a88270d9a8e90a3ae199d5ab7668bdc0d2b.jpg'
        },
        'home-automation': {
            title: 'Home Automation System',
            description: 'Smart home automation solution with voice control and energy optimization features.',
            features: [
                'Voice-controlled automation',
                'Smart lighting and climate control',
                'Security system integration',
                'Energy usage optimization',
                'Remote monitoring and control'
            ],
            technologies: ['IoT Devices', 'Home Assistant', 'Alexa/Google Assistant', 'MQTT', 'Node-RED'],
            image: 'https://kimi-web-img.moonshot.cn/img/images.stockcake.com/b48e2b2cd4a1740658d06aa3437686330ac1aeb2.jpg'
        }
    };
    
    const project = projectDetails[projectId];
    if (project) {
        showProjectModal(project);
    }
}

function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="glass max-w-4xl w-full max-h-screen overflow-y-auto rounded-lg">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-cyan-400">${project.title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-2xl">&times;</button>
                </div>
                
                <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-6">
                
                <p class="text-gray-300 mb-6">${project.description}</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-purple-400">Key Features</h3>
                        <ul class="space-y-2">
                            ${project.features.map(feature => `<li class="text-gray-300">• ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-green-400">Technologies Used</h3>
                        <div class="flex flex-wrap gap-2">
                            ${project.technologies.map(tech => `<span class="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <button class="btn-neon" onclick="this.closest('.fixed').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

// Service detail functions
function showServiceDetails(serviceId) {
    const serviceDetails = {
        'hardware-networking': {
            title: 'Hardware & Networking Services',
            description: 'Professional hardware and networking solutions for home and business environments.',
            services: [
                'Computer repair and maintenance',
                'Network setup and configuration',
                'VPN installation and management',
                'Hardware troubleshooting',
                'System optimization and upgrades',
                'Data backup and recovery',
                'Wireless network optimization',
                'Network security implementation'
            ],
            pricing: 'Starting from $50 per hour',
            contact: 'Contact for custom quotes'
        },
        'video-editing': {
            title: 'Video Editing Services',
            description: 'Professional video editing and post-production services for all types of content.',
            services: [
                'Professional video editing',
                'Color grading and correction',
                'Motion graphics and animations',
                'Social media content creation',
                'Promotional video production',
                'YouTube content editing',
                'Wedding and event videos',
                'Corporate video production'
            ],
            pricing: 'Starting from $30 per hour',
            contact: 'Package deals available'
        },
        'digital-design': {
            title: 'Digital Design Services',
            description: 'Creative design solutions for digital and print media with modern aesthetics.',
            services: [
                'Brand identity design',
                'Social media graphics',
                'Marketing materials design',
                'Logo and business card design',
                'Print design services',
                'Website graphics',
                'Infographic design',
                'Presentation design'
            ],
            pricing: 'Starting from $40 per project',
            contact: 'Custom packages available'
        },
        'ai-solutions': {
            title: 'AI Solutions & Integration',
            description: 'Cutting-edge AI solutions to automate workflows and enhance productivity.',
            services: [
                'AI tool integration and setup',
                'Content generation automation',
                'Workflow automation',
                'Custom AI solutions',
                'Training and consultation',
                'API integration services',
                'AI-powered analytics',
                'Process optimization'
            ],
            pricing: 'Starting from $75 per hour',
            contact: 'Enterprise solutions available'
        }
    };
    
    const service = serviceDetails[serviceId];
    if (service) {
        showServiceModal(service);
    }
}

function showServiceModal(service) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="glass max-w-2xl w-full rounded-lg">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-purple-400">${service.title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-2xl">&times;</button>
                </div>
                
                <p class="text-gray-300 mb-6">${service.description}</p>
                
                <h3 class="text-xl font-bold mb-4 text-cyan-400">Services Included</h3>
                <ul class="space-y-2 mb-6">
                    ${service.services.map(service => `<li class="text-gray-300">• ${service}</li>`).join('')}
                </ul>
                
                <div class="grid md:grid-cols-2 gap-4 mb-6">
                    <div class="glass p-4 rounded-lg">
                        <h4 class="font-bold text-green-400 mb-2">Pricing</h4>
                        <p class="text-gray-300">${service.pricing}</p>
                    </div>
                    <div class="glass p-4 rounded-lg">
                        <h4 class="font-bold text-yellow-400 mb-2">Note</h4>
                        <p class="text-gray-300">${service.contact}</p>
                    </div>
                </div>
                
                <div class="text-center space-x-4">
                    <button class="btn-neon" onclick="scrollToSection('contact'); this.closest('.fixed').remove();">Get Quote</button>
                    <button class="btn-neon" onclick="this.closest('.fixed').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

// AI Tools details function
function showAIToolsDetails() {
    const aiTools = [
        { name: 'ChatGPT', description: 'Advanced conversational AI for content generation and problem-solving', category: 'Conversational AI' },
        { name: 'Perplexity', description: 'AI-powered search engine with real-time information', category: 'Search & Research' },
        { name: 'DeepSeek', description: 'Advanced language model for coding and technical tasks', category: 'Technical AI' },
        { name: 'Grok', description: 'xAI\'s conversational AI with real-time data access', category: 'Conversational AI' },
        { name: 'Claude', description: 'Anthropic\'s AI assistant with advanced reasoning', category: 'Conversational AI' },
        { name: 'Gemini', description: 'Google\'s multimodal AI for text, image, and code', category: 'Multimodal AI' },
        { name: 'Qwen', description: 'Alibaba\'s large language model series', category: 'Language Model' },
        { name: 'Poe', description: 'Platform for accessing multiple AI chatbots', category: 'AI Platform' },
        { name: 'Google Studio', description: 'Google\'s AI development and deployment platform', category: 'Development Platform' },
        { name: 'Microsoft Bing AI', description: 'Microsoft\'s AI-powered search and chat', category: 'Search & Chat' },
        { name: 'Ernie', description: 'Baidu\'s enhanced representation through knowledge integration', category: 'Language Model' },
        { name: 'Kimi AI', description: 'Advanced AI assistant with long context understanding', category: 'Conversational AI' }
    ];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="glass max-w-4xl w-full max-h-screen overflow-y-auto rounded-lg">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-green-400">AI Tools Expertise</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-2xl">&times;</button>
                </div>
                
                <p class="text-gray-300 mb-6">I have extensive experience with a wide range of AI tools and platforms. Here's a comprehensive list of my expertise:</p>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${aiTools.map(tool => `
                        <div class="glass p-4 rounded-lg border border-transparent hover:border-cyan-400 transition-all duration-300">
                            <h3 class="font-bold text-cyan-400 mb-2">${tool.name}</h3>
                            <p class="text-sm text-gray-400 mb-2">${tool.description}</p>
                            <span class="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">${tool.category}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-8 text-center">
                    <p class="text-gray-400 mb-4">I'm constantly exploring new AI tools and technologies to stay at the forefront of innovation.</p>
                    <button class="btn-neon" onclick="this.closest('.fixed').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fixed')) {
        e.target.remove();
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.fixed');
        modals.forEach(modal => modal.remove());
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading states for buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-neon') && e.target.type === 'submit') {
        const button = e.target;
        const originalText = button.textContent;
        
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
});

// Initialize tooltips for tech stack items
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip absolute bg-gray-800 text-white px-2 py-1 rounded text-sm z-50';
            tooltip.textContent = this.getAttribute('data-tooltip') || this.textContent;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-bg');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Initialize particle system for enhanced visual effects
function initializeParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Initialize enhanced features when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    setTimeout(initializeParticleSystem, 1000);
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add glow effect to neon elements
    const neonElements = document.querySelectorAll('.neon-text-cyan, .neon-text-purple');
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});

// Console welcome message
console.log(`
🚀 Welcome to Roshan Dhamala's Portfolio!

💻 Built with modern web technologies:
   - HTML5 & CSS3
   - JavaScript ES6+
   - Tailwind CSS
   - Anime.js for animations
   - p5.js for creative coding
   - Typed.js for typewriter effects

📧 Contact: openmindroshan@gmail.com
📱 Phone: 9823803417
🌐 Location: Itahari-2, Nepal

Feel free to explore the code and get inspired!
`);
