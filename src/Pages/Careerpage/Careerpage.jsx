import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import HeaderSticky from "../../Components/Header/HeaderSticky";
import MobileHeader from "../../Components/Header/MobileHeader";

import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

const TEAM_DEFINITIONS = [
    {
        number: "01",
        title: "Landmark Projects",
        description:
            "Work on architectural metalwork and custom fabrication for projects across Canada and the United States.",
        icon: "building",
    },
    {
        number: "02",
        title: "In-House Capability",
        description:
            "Be part of a team where cutting, machining, forming, welding, finishing, assembly, and inspection happen under one roof.",
        icon: "factory",
    },
    {
        number: "03",
        title: "Craft With Responsibility",
        description:
            "Every detail matters because our work is visible, structural, lasting, and built for real-world performance.",
        icon: "shield",
    },
    {
        number: "04",
        title: "Long-Term Growth",
        description:
            "Join a company with decades of experience, continued expansion, and a reputation built through discipline.",
        icon: "growth",
    },
];

const CAREER_AREAS = [
    {
        title: "Welding & Fabrication",
        icon: "welding",
    },
    {
        title: "CNC, Laser & Waterjet",
        icon: "machine",
    },
    {
        title: "Engineering & Drafting",
        icon: "drafting",
    },
    {
        title: "Project Management",
        icon: "clipboard",
    },
    {
        title: "Quality Control & Inspection",
        icon: "quality",
    },
    {
        title: "Finishing, Assembly & Production",
        icon: "production",
    },
];

/*
  Add real vacancies here when positions become available.

  Example:

  {
    title: "Structural Steel Welder",
    location: "Toronto, Ontario",
    type: "Full-Time",
    department: "Fabrication",
    href: "/careers/structural-steel-welder",
  }
*/

const JOBS_BY_REGION = {
    canada: [
        {
            title: "Structural Steel Welder",
            location: "Toronto, Ontario",
            type: "Full-Time",
            department: "Welding & Fabrication",
        },
        {
            title: "CNC Machine Operator",
            location: "Toronto, Ontario",
            type: "Full-Time",
            department: "CNC, Laser & Waterjet",
        },
        {
            title: "Project Coordinator",
            location: "Toronto, Ontario",
            type: "Full-Time",
            department: "Project Management",
        },
    ],

    us: [
        {
            title: "Metal Fabricator",
            location: "New York, United States",
            type: "Full-Time",
            department: "Welding & Fabrication",
        },
        {
            title: "Quality Control Inspector",
            location: "New York, United States",
            type: "Full-Time",
            department: "Quality Control & Inspection",
        },
    ],
};

const revealAnimation = {
    initial: {
        opacity: 0,
        y: 40,
    },
    whileInView: {
        opacity: 1,
        y: 0,
    },
    viewport: {
        once: true,
        amount: 0.2,
    },
    transition: {
        duration: 0.7,
        ease: "easeOut",
    },
};

function CareerIcon({
    name,
    className = "h-7 w-7",
}) {
    const commonProps = {
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        "aria-hidden": true,
    };

    switch (name) {
        case "building":
            return (
                <svg {...commonProps}>
                    <path d="M3 21h18" />
                    <path d="M6 21V4h9v17" />
                    <path d="M15 9h3v12" />
                    <path d="M9 8h3" />
                    <path d="M9 12h3" />
                    <path d="M9 16h3" />
                </svg>
            );

        case "factory":
            return (
                <svg {...commonProps}>
                    <path d="M3 21V10l6 4v-4l6 4V5h6v16H3Z" />
                    <path d="M17 9h2" />
                    <path d="M17 13h2" />
                    <path d="M7 18h2" />
                    <path d="M12 18h2" />
                </svg>
            );

        case "shield":
            return (
                <svg {...commonProps}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case "growth":
            return (
                <svg {...commonProps}>
                    <path d="M4 20h16" />
                    <path d="m6 16 4-4 3 3 5-7" />
                    <path d="M15 8h3v3" />
                </svg>
            );

        case "welding":
            return (
                <svg {...commonProps}>
                    <path d="M8 3h8l2 7-6 4-6-4 2-7Z" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 14v4" />
                </svg>
            );

        case "machine":
            return (
                <svg {...commonProps}>
                    <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                    />
                    <path d="M7 8h10" />
                    <path d="M7 12h5" />
                    <circle
                        cx="16.5"
                        cy="14.5"
                        r="2.5"
                    />
                </svg>
            );

        case "drafting":
            return (
                <svg {...commonProps}>
                    <path d="m4 20 16-16" />
                    <path d="m7 17-2-2" />
                    <path d="m10 14-2-2" />
                    <path d="m13 11-2-2" />
                    <path d="m16 8-2-2" />
                    <path d="M4 4h6L4 10V4Z" />
                </svg>
            );

        case "clipboard":
            return (
                <svg {...commonProps}>
                    <rect
                        x="5"
                        y="4"
                        width="14"
                        height="17"
                        rx="2"
                    />
                    <path d="M9 4V2h6v2" />
                    <path d="M9 9h6" />
                    <path d="M9 13h6" />
                    <path d="M9 17h4" />
                </svg>
            );

        case "quality":
            return (
                <svg {...commonProps}>
                    <circle
                        cx="10"
                        cy="10"
                        r="6"
                    />
                    <path d="m14.5 14.5 5 5" />
                    <path d="m7.5 10 1.7 1.7 3.3-3.4" />
                </svg>
            );

        case "production":
            return (
                <svg {...commonProps}>
                    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5" />
                    <path d="m3 16 9 5 9-5" />
                </svg>
            );

        case "upload":
            return (
                <svg {...commonProps}>
                    <path d="M12 16V4" />
                    <path d="m8 8 4-4 4 4" />
                    <path d="M4 20h16" />
                </svg>
            );

        case "arrow":
            return (
                <svg {...commonProps}>
                    <path d="M5 12h14" />
                    <path d="m14 7 5 5-5 5" />
                </svg>
            );

        default:
            return null;
    }
}

function SectionLabel({ children }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#00688F]" />

            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#00688F]">
                {children}
            </span>
        </div>
    );
}

export default function Careerpage() {
    const location = useLocation();

    const pageRegion = location.pathname
        .toLowerCase()
        .startsWith("/us")
        ? "us"
        : "canada";

    const [activeRegion, setActiveRegion] =
        useState(pageRegion);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [formStatus, setFormStatus] =
        useState({
            type: "",
            message: "",
        });

    useEffect(() => {
        setActiveRegion(pageRegion);
    }, [pageRegion]);

    const currentJobs =
        JOBS_BY_REGION[activeRegion];

    const scrollToSection = (sectionId) => {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    const [selectedJob, setSelectedJob] =
        useState(null);

    const handleJobSelect = (job) => {
        setSelectedJob(job);

        document
            .getElementById("talent-community")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    const handleTalentSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const resume = formData.get("resume");

        setFormStatus({
            type: "",
            message: "",
        });

        if (
            resume instanceof File &&
            resume.size > 10 * 1024 * 1024
        ) {
            setFormStatus({
                type: "error",
                message:
                    "Please upload a resume smaller than 10 MB.",
            });

            return;
        }

        const endpoint =
            import.meta.env
                .VITE_TALENT_API_ENDPOINT;

        if (!endpoint) {
            setFormStatus({
                type: "error",
                message:
                    "The submission service has not been connected yet.",
            });

            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(
                    "Unable to submit application.",
                );
            }

            form.reset();

            setFormStatus({
                type: "success",
                message:
                    "Thank you. Your information has been submitted to our hiring team.",
            });
        } catch (error) {
            console.error(error);

            setFormStatus({
                type: "error",
                message:
                    "We could not submit your information. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClassName =
        "w-full rounded-[12px] border border-[#D5D9DB] bg-white px-4 py-4 text-[15px] text-black outline-none transition-colors duration-300 placeholder:text-[#8C9295] focus:border-[#00688F]";

    return (
        <div
            className="
    min-h-screen
    bg-white
    text-[#111315]
    font-unageo
    [&_h1]:font-counture
    [&_h2]:font-counture
    [&_h3]:font-counture
    [&_h4]:font-counture
  "
        >
            <HeaderSticky />
            <MobileHeader />

            <main>
                {/* Hero */}
                <section className="relative flex min-h-[720px] items-end overflow-hidden bg-black lg:min-h-[790px]">
                    <img
                        src="/images/careers/careers-hero.webp"
                        alt="Mariani team reviewing architectural metalwork"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />

                    <div className="relative z-10 mx-auto w-full max-w-[90vw] pb-16 pt-16 lg:pb-24">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 45,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.85,
                                ease: "easeOut",
                            }}
                            className="max-w-[850px]"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-[1px] w-10 bg-[#55B4D4]" />

                                <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8BD0E7]">
                                    Careers
                                </span>
                            </div>

                            <h1 className="max-w-[800px] text-[44px] font-semibold leading-[1.05] text-white sm:text-[56px] lg:text-[76px]">
                                At Mariani, your craft becomes
                                your legacy.
                            </h1>

                            <p className="mt-7 max-w-[760px] text-[16px] leading-7 text-white/80 sm:text-[18px]">
                                For nearly four decades, Mariani
                                Metal has helped shape complex
                                architectural metalwork across
                                Canada and the United States. From
                                landmark public spaces to advanced
                                commercial, cultural,
                                institutional, and infrastructure
                                projects, our work is built with
                                precision, discipline, and pride.
                            </p>

                            <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-white/80 sm:text-[18px]">
                                If you are skilled, detail-driven,
                                and ready to work on projects that
                                leave a lasting mark, there may be
                                a place for you at Mariani.
                            </p>

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        scrollToSection(
                                            "job-opportunities",
                                        )
                                    }
                                    className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#00688F] px-7 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#005472]"
                                >
                                    View Open Positions

                                    <CareerIcon
                                        name="arrow"
                                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        scrollToSection(
                                            "talent-community",
                                        )
                                    }
                                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/5 px-7 py-4 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                                >
                                    Submit Your Resume
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* What Defines Our Team */}
                <section className="overflow-hidden py-20 lg:py-32">
                    <div className="mx-auto max-w-[90vw]">
                        <motion.div
                            {...revealAnimation}
                            className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
                        >
                            <div>
                                <SectionLabel>
                                    What Defines Our Team
                                </SectionLabel>

                                <h2 className="max-w-[650px] text-[30px] font-semibold leading-[1.12] sm:text-[35px] lg:text-[50px]">
                                    Precision is not one department.
                                    It defines the entire team.
                                </h2>
                            </div>

                            <p className="max-w-[700px] text-[16px] leading-7 text-[#5F666A] lg:justify-self-end lg:text-[18px]">
                                At Mariani, every role contributes
                                to something larger than a single
                                part, panel, weld, drawing, or
                                finish. Our team works across
                                fabrication, engineering,
                                machining, welding, finishing,
                                assembly, and quality control to
                                bring complex ideas into built
                                form. The work demands focus. It
                                rewards precision.
                            </p>
                        </motion.div>

                        <div className="mt-14 grid gap-8 lg:grid-cols-[1.03fr_0.97fr]">
                            <motion.div
                                {...revealAnimation}
                                className="relative min-h-[500px] overflow-hidden rounded-[24px] bg-[#E7EBED]"
                            >
                                <img
                                    src="/images/careers/careers-team.webp"
                                    alt="Mariani fabrication team working together"
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
                                    <p className="max-w-[480px] text-[15px] leading-6 text-white/80">
                                        Fabrication, engineering,
                                        machining, finishing, assembly,
                                        and inspection are connected by
                                        one shared standard.
                                    </p>
                                </div>
                            </motion.div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {TEAM_DEFINITIONS.map(
                                    (item, index) => (
                                        <motion.article
                                            key={item.title}
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.2,
                                            }}
                                            transition={{
                                                duration: 0.55,
                                                delay: index * 0.08,
                                            }}
                                            className="group flex min-h-[240px] flex-col justify-between rounded-[20px] border border-[#DDE1E3] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00688F] hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
                                        >
                                            <div className="flex items-start justify-between gap-5">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4F7] text-[#00688F] transition-colors duration-300 group-hover:bg-[#00688F] group-hover:text-white">
                                                    <CareerIcon
                                                        name={item.icon}
                                                    />
                                                </div>

                                                <span className="text-[12px] font-semibold tracking-[0.15em] text-[#A0A5A8]">
                                                    {item.number}
                                                </span>
                                            </div>

                                            <div className="mt-10">
                                                <h3 className="text-[21px] font-semibold">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-3 text-[14px] leading-6 text-[#666D71]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.article>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Career Disciplines */}
                <section className="bg-[#F3F5F6] py-20 lg:py-32">
                    <div className="mx-auto max-w-[90vw]">
                        <motion.div
                            {...revealAnimation}
                            className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end"
                        >
                            <div>
                                <SectionLabel>
                                    Build Your Career at Mariani
                                </SectionLabel>

                                <h2 className="max-w-[700px] text-[30px] font-semibold leading-[1.12] sm:text-[35px] lg:text-[50px]">
                                    Build skills that become part of
                                    something permanent.
                                </h2>
                            </div>

                            <p className="max-w-[580px] text-[16px] leading-7 text-[#5F666A] lg:justify-self-end lg:text-[18px]">
                                Join a team where skill,
                                discipline, and precision come
                                together to shape landmark projects
                                across Canada and the United
                                States.
                            </p>
                        </motion.div>

                        <div className="mt-14 grid gap-[1px] overflow-hidden rounded-[24px] bg-[#CFD5D8] md:grid-cols-2 lg:grid-cols-3">
                            {CAREER_AREAS.map(
                                (area, index) => (
                                    <motion.article
                                        key={area.title}
                                        initial={{
                                            opacity: 0,
                                            y: 25,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            delay: index * 0.06,
                                        }}
                                        className="group min-h-[220px] bg-white p-7 transition-colors duration-300 hover:bg-[#00688F] sm:p-8"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4F7] text-[#00688F] transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                                            <CareerIcon
                                                name={area.icon}
                                            />
                                        </div>

                                        <div className="mt-16 flex items-end justify-between gap-5">
                                            <h3 className="max-w-[260px] text-[22px] font-semibold leading-7 transition-colors duration-300 group-hover:text-white">
                                                {area.title}
                                            </h3>

                                            <CareerIcon
                                                name="arrow"
                                                className="h-5 w-5 shrink-0 text-[#00688F] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                                            />
                                        </div>
                                    </motion.article>
                                ),
                            )}
                        </div>
                    </div>
                </section>

                {/* Job Opportunities */}
                <section
                    id="job-opportunities"
                    className="scroll-mt-28 py-20 lg:py-32"
                >
                    <div className="mx-auto max-w-[90vw]">
                        <motion.div
                            {...revealAnimation}
                            className="text-center"
                        >
                            <SectionLabel>
                                Job Opportunities
                            </SectionLabel>

                            <h2 className="text-[38px] font-semibold leading-tight sm:text-[35px] lg:text-[50px]">
                                Find your place at Mariani.
                            </h2>

                            <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-7 text-[#626A6E] lg:text-[18px]">
                                Explore current opportunities by
                                region or submit your resume to be
                                considered for future openings.
                            </p>
                        </motion.div>

                        <div className="mt-10 flex justify-center">
                            <div className="inline-flex rounded-full border border-[#D7DCDE] bg-[#F4F6F7] p-1.5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveRegion("canada")
                                    }
                                    className={`cursor-pointer rounded-full px-7 py-3 text-[14px] font-semibold transition-all duration-300 ${activeRegion === "canada"
                                        ? "bg-[#00688F] text-white shadow-sm"
                                        : "text-[#656C70] hover:text-black"
                                        }`}
                                >
                                    Canada
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveRegion("us")
                                    }
                                    className={`cursor-pointer rounded-full px-7 py-3 text-[14px] font-semibold transition-all duration-300 ${activeRegion === "us"
                                        ? "bg-[#00688F] text-white shadow-sm"
                                        : "text-[#656C70] hover:text-black"
                                        }`}
                                >
                                    United States
                                </button>
                            </div>
                        </div>

                        <div className="mt-12">
                            {currentJobs.length > 0 ? (
                                <div className="divide-y divide-[#DCE0E2] border-y border-[#DCE0E2]">
                                    {currentJobs.map((job) => (
                                        <button
                                            key={`${job.title}-${job.location}`}
                                            type="button"
                                            onClick={() => handleJobSelect(job)}
                                            className="group grid w-full cursor-pointer gap-4 py-7 text-left transition-colors duration-300 hover:bg-[#F5F7F8] sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"
                                        >
                                            <div>
                                                <h3 className="text-[21px] font-semibold transition-colors duration-300 group-hover:text-[#00688F]">
                                                    {job.title}
                                                </h3>

                                                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-[#6B7276]">
                                                    <span>{job.location}</span>
                                                    <span>{job.type}</span>
                                                    <span>{job.department}</span>
                                                </div>
                                            </div>

                                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CBD1D4] text-[#00688F] transition-all duration-300 group-hover:border-[#00688F] group-hover:bg-[#00688F] group-hover:text-white">
                                                <CareerIcon
                                                    name="arrow"
                                                    className="h-5 w-5"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    {...revealAnimation}
                                    className="mx-auto max-w-[880px] rounded-[24px] border border-[#DCE1E3] bg-[#F6F8F9] px-6 py-14 text-center sm:px-12"
                                >
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F2F6] text-[#00688F]">
                                        <CareerIcon
                                            name="clipboard"
                                        />
                                    </div>

                                    <h3 className="mt-6 text-[25px] font-semibold">
                                        New positions will be added
                                        here.
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-[570px] text-[15px] leading-6 text-[#646C70]">
                                        There are no published openings
                                        for{" "}
                                        {activeRegion === "canada"
                                            ? "Canada"
                                            : "the United States"}{" "}
                                        at this time. Submit your resume
                                        to stay connected with our
                                        hiring team.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToSection(
                                                "talent-community",
                                            )
                                        }
                                        className="mt-7 cursor-pointer rounded-full bg-[#00688F] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#005472]"
                                    >
                                        Join Our Talent Community
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Talent Community */}
                <section
                    id="talent-community"
                    className="scroll-mt-28 bg-[#063746] py-20 text-white lg:py-32"
                >
                    <div className="mx-auto max-w-[90vw]">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                            <motion.div
                                {...revealAnimation}
                            >
                                <SectionLabel>
                                    Join Our Talent Community
                                </SectionLabel>

                                <h2 className="max-w-[570px] text-[38px] font-semibold leading-[1.1] sm:text-[35px] lg:text-[50px]">
                                    Be the first to hear about new
                                    opportunities.
                                </h2>

                                <p className="mt-6 max-w-[570px] text-[17px] leading-7 text-white/65">
                                    Submit your details and resume to
                                    stay connected with our hiring
                                    team for current and future
                                    openings.
                                </p>

                                <div className="relative mt-10 min-h-[330px] overflow-hidden rounded-[22px]">
                                    <img
                                        src="/images/careers/careers-talent.webp"
                                        alt="Skilled Mariani employee completing precision work"
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                            </motion.div>

                            <motion.form
                                {...revealAnimation}
                                onSubmit={handleTalentSubmit}
                                encType="multipart/form-data"
                                className="rounded-[24px] bg-white p-6 text-black sm:p-8 lg:p-10"
                            >
                                {selectedJob && (
                                    <div className="mb-6 rounded-[14px] border border-[#B9D9E4] bg-[#EDF7FA] p-5">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00688F]">
                                            Applying For
                                        </span>

                                        <h3 className="mt-2 text-[20px] font-semibold text-black">
                                            {selectedJob.title}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#606A6E]">
                                            <span>{selectedJob.location}</span>
                                            <span>{selectedJob.type}</span>
                                            <span>{selectedJob.department}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedJob(null)}
                                            className="mt-3 cursor-pointer text-[13px] font-semibold text-[#00688F] hover:underline"
                                        >
                                            Clear selected position
                                        </button>
                                    </div>
                                )}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            First Name *
                                        </label>

                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            autoComplete="given-name"
                                            placeholder="First name"
                                            className={
                                                inputClassName
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            Last Name *
                                        </label>

                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            autoComplete="family-name"
                                            placeholder="Last name"
                                            className={
                                                inputClassName
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            Email *
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            placeholder="name@email.com"
                                            className={
                                                inputClassName
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            Phone
                                        </label>

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="Phone number"
                                            className={
                                                inputClassName
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="areaOfInterest"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            Area of Interest *
                                        </label>

                                        <select
                                            id="areaOfInterest"
                                            name="areaOfInterest"
                                            required
                                            defaultValue=""
                                            className={
                                                inputClassName
                                            }
                                        >
                                            <option value="" disabled>
                                                Select an area
                                            </option>

                                            {CAREER_AREAS.map(
                                                (area) => (
                                                    <option
                                                        key={area.title}
                                                        value={area.title}
                                                    >
                                                        {area.title}
                                                    </option>
                                                ),
                                            )}

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="preferredLocation"
                                            className="mb-2 block text-[13px] font-semibold"
                                        >
                                            Preferred Location *
                                        </label>

                                        <select
                                            id="preferredLocation"
                                            name="preferredLocation"
                                            required
                                            defaultValue=""
                                            className={
                                                inputClassName
                                            }
                                        >
                                            <option value="" disabled>
                                                Select a location
                                            </option>

                                            <option value="Canada">
                                                Canada
                                            </option>

                                            <option value="United States">
                                                United States
                                            </option>

                                            <option value="Either">
                                                Open to Either
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label
                                        htmlFor="resume"
                                        className="mb-2 block text-[13px] font-semibold"
                                    >
                                        Upload Resume *
                                    </label>

                                    <label
                                        htmlFor="resume"
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed border-[#AEB7BB] bg-[#F6F8F9] px-5 py-8 text-center transition-colors duration-300 hover:border-[#00688F] hover:bg-[#EEF6F8]"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#00688F] shadow-sm">
                                            <CareerIcon
                                                name="upload"
                                            />
                                        </div>

                                        <span className="mt-4 text-[14px] font-semibold">
                                            Choose your resume
                                        </span>

                                        <span className="mt-1 text-[12px] text-[#727A7E]">
                                            PDF, DOC or DOCX. Maximum 10
                                            MB.
                                        </span>
                                    </label>

                                    <input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        required
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        className="sr-only"
                                    />
                                </div>

                                <div className="mt-5">
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-[13px] font-semibold"
                                    >
                                        Additional Information
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us briefly about your experience."
                                        className={`${inputClassName} resize-none`}
                                    />
                                </div>

                                <input
                                    type="hidden"
                                    name="positionAppliedFor"
                                    value={selectedJob?.title || "General Application"}
                                />

                                <input
                                    type="hidden"
                                    name="positionLocation"
                                    value={selectedJob?.location || ""}
                                />

                                <input
                                    type="hidden"
                                    name="positionDepartment"
                                    value={selectedJob?.department || ""}
                                />

                                <div className="mt-7">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#00688F] px-7 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#005472] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Submit Application"}

                                        {!isSubmitting && (
                                            <CareerIcon
                                                name="arrow"
                                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        )}
                                    </button>

                                    {formStatus.message && (
                                        <p
                                            role="status"
                                            className={`mt-4 text-[14px] ${formStatus.type ===
                                                "success"
                                                ? "text-green-700"
                                                : "text-red-700"
                                                }`}
                                        >
                                            {formStatus.message}
                                        </p>
                                    )}
                                </div>



                            </motion.form>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-white py-8 sm:py-12">
                    <div className="mx-auto max-w-[94vw]">
                        <motion.div
                            {...revealAnimation}
                            className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[28px] bg-black px-6 py-20 text-center"
                        >
                            <img
                                src="/images/careers/careers-cta.webp"
                                alt="Completed architectural metalwork by Mariani"
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/65" />

                            <div className="relative z-10 max-w-[820px]">
                                <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#8BD0E7]">
                                    Ready to Build With Mariani?
                                </span>

                                <h2 className="mt-5 text-[38px] font-semibold leading-[1.08] text-white sm:text-[35px] lg:text-[50px]">
                                    Bring your skill to work that
                                    leaves a lasting mark.
                                </h2>

                                <p className="mx-auto mt-6 max-w-[700px] text-[16px] leading-7 text-white/70 lg:text-[18px]">
                                    Bring your skill, your discipline,
                                    and your attention to detail to a
                                    team trusted on complex projects
                                    across Canada and the United
                                    States.
                                </p>

                                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToSection(
                                                "job-opportunities",
                                            )
                                        }
                                        className="cursor-pointer rounded-full bg-[#00688F] px-7 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#005472]"
                                    >
                                        View Open Positions
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToSection(
                                                "talent-community",
                                            )
                                        }
                                        className="cursor-pointer rounded-full border border-white/60 px-7 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
                                    >
                                        Join Our Talent Community
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footers />
            <MobileFooters />
            <ScrollToTop />
        </div>
    );
}