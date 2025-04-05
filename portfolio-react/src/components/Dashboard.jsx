import React, { useRef } from 'react';

function Dashboard() {
    const sectionsRef = useRef({});

    const scrollToSection = (sectionId) => {
        sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
    };
    const sections = {
        home: {
            title: "Home",
            content:
                <div>
                    <div className='flex justify-evenly items-center select-none'>
                        <p className='max-w-sm flex flex-col gap-4 *:ease-in-out *:duration-300'>
                            <span className='text-3xl  md:text-5xl' style={{ fontFamily: "'Roboto Mono','Bai Jamjuree',sans-serif" }}>Designer</span>
                            <span>Product designer specialising in UI design and design systems.</span>
                        </p>
                        <img className='top-8 max-md:my-auto md:-right-40 lg:w-1/2 lg:right-0 lg:top-0' src="https://watracz.com/assets/images/bg_home.png" alt="Homepage Visual" draggable={false} />
                        <p className='max-w-sm flex flex-col gap-4 *:ease-in-out *:duration-300'>
                            <span className='text-3xl  md:text-5xl' style={{ fontFamily: "'Roboto Mono','Bai Jamjuree',sans-serif" }}>Progammer</span>
                            <span>Front end developer who writes clean, elegant and efficient code.</span>
                        </p>
                    </div>
                </div>,
        },
        about: {
            title: "About Me",
            content: <p>I'm a web developer who loves coding.</p>,
        },
        skills: {
            title: "Skills",
            content: <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>Tailwind CSS</li>
            </ul>,
        },
        experience: {
            title: "Experience",
            content: <p>Worked on multiple projects including full-stack applications.</p>,
        },
        projects: {
            title: "Projects",
            content: <p>Check out my GitHub for more projects.</p>,
        },
        contact: {
            title: "Contact",
            content: <p>Email: example@gmail.com</p>,
        }
    };

    return (
        <main className="">
            {Object.entries(sections).map(([key, section]) => (
                <section
                    key={key}
                    id={key}
                    ref={(el) => (sectionsRef.current[key] = el)}
                    className={`min-h-screen mx-auto px-6 pt-24 *:ease-in-out *:duration-300 ${key === "home" ? "w-full pt-0" : "max-w-7xl"}`}
                >
                    <h2
                        className={`text-3xl font-bold mb-4 md:text-5xl ${key === "home" ? "hidden" : ""}`}
                    >
                        {section.title}
                    </h2>
                    <div className='md:text-xl'>{section.content}</div>
                </section>
            ))}
        </main>
    );

}

export default Dashboard;
