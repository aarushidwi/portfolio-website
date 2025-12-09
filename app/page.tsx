"use client";

import { useEffect, useState } from "react";
import Garden from "./components/Garden";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "experience", "projects", "garden", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a192f]/90 backdrop-blur-sm z-50 border-b border-[#233554]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-[#64ffda] font-semibold text-lg">Aarushi Dwivedi</div>
            <div className="flex gap-8">
              {["about", "education", "experience", "projects", "garden", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-[#64ffda]"
                      : "text-[#8892b0] hover:text-[#64ffda]"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl">
          <p className="text-[#64ffda] mb-4">Hi, my name is</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-[#ccd6f6] mb-4">
            Aarushi Dwivedi
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#8892b0] mb-1">
            Offensive Security Engineer
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-[#8892b0] mb-6">
            Cloud Security Enthusiast
          </h3>
          <p className="text-[#8892b0] text-lg max-w-2xl leading-relaxed">
            I specialize in penetration testing, vulnerability research, and securing systems
            against emerging threats. Passionate about breaking things to make them stronger.
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 py-12 max-w-7xl mx-auto">
        {/* Left Column - About Section (Sticky) */}
        <aside className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
          <section id="about" className="py-8">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8 flex items-center">
              <span className="text-[#64ffda] mr-2">01.</span> About Me
            </h2>
            <div className="text-[#8892b0] space-y-4">
              <p>
                Hello! I'm a Senior Security Engineer at Praetorian Security, specializing in cloud security,
                threat modeling, and offensive security operations. With a Master's degree in Cybersecurity
                from Georgia Tech, I focus on identifying and mitigating complex security risks across AWS,
                Azure, and GCP environments.
              </p>
              <p>
                I develop security tooling, conduct penetration testing, and apply AI/ML techniques to enhance
                detection capabilities. My work spans cloud security assessments, mobile application testing,
                and building automation solutions that help organizations strengthen their security posture.
              </p>
              <p>Here are some technologies and concepts I work with:</p>
              <ul className="grid grid-cols-1 gap-2 mt-4">
                {["Cloud Security (AWS, Azure, GCP)", "Python & Go", "Threat Modeling & Attack Path Mapping", "Security Automation", "AI/ML in Cybersecurity", "Vulnerability Analysis"].map(
                  (tech) => (
                    <li key={tech} className="flex items-center">
                      <span className="text-[#64ffda] mr-2">▹</span> {tech}
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
        </aside>

        {/* Right Column - All Other Sections */}
        <main className="lg:w-2/3 space-y-16">
          {/* Education Section */}
          <section id="education" className="py-8">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8 flex items-center">
              <span className="text-[#64ffda] mr-2">02.</span> Education
              <div className="ml-4 h-[1px] bg-[#233554] flex-grow"></div>
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-[#64ffda] pl-6">
                <h3 className="text-xl font-semibold text-[#ccd6f6]">
                  Masters in Cybersecurity
                </h3>
                <p className="text-[#64ffda] mb-2">Georgia Institute of Technology</p>
                <p className="text-sm text-[#8892b0] mb-4">2021 - 2023</p>
              </div>
              <div className="border-l-2 border-[#64ffda] pl-6">
                <h3 className="text-xl font-semibold text-[#ccd6f6]">
                  Bachelors in Technology (Information Technology)
                </h3>
                <p className="text-[#64ffda] mb-2">Maharaja Agrasen Institute of Technology</p>
                <p className="text-sm text-[#8892b0] mb-4">2017 - 2021</p>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-8">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8 flex items-center">
              <span className="text-[#64ffda] mr-2">03.</span> Where I've Worked
              <div className="ml-4 h-[1px] bg-[#233554] flex-grow"></div>
            </h2>
            <div className="space-y-8">
              {[
                {
                  company: "Praetorian Security Inc",
                  role: "Senior Security Engineer",
                  period: "Oct 2024 - Current",
                  description: [
                    "Lead complex cloud and web security engagements across AWS, Azure, and GCP, performing attack path mapping and risk-informed threat modelling",
                    "Develop and enhance internal security tooling including the Nebula multi-cloud enumeration platform using Python, Go and cloud-native services",
                    "Apply data analytics and AI/ML techniques to enhance detection logic and automate analysis workflows",
                    "Collaborate with diverse stakeholders and mentor junior engineers while delivering high-quality findings and presentations",
                  ],
                },
                {
                  company: "Praetorian Security Inc",
                  role: "Security Engineer",
                  period: "Jun 2023 - Oct 2024",
                  description: [
                    "Performed diverse security assessments including Android/iOS mobile testing and web application reviews",
                    "Identified vulnerabilities and misconfigurations, delivering clear, risk-based reports with actionable remediation guidance",
                    "Supported client teams during remediation and collaborated with senior engineers to refine testing methodologies",
                  ],
                },
                {
                  company: "Georgia Institute of Technology",
                  role: "Head Graduate Teaching Assistant",
                  period: "Jan 2022 - Dec 2023",
                  description: [
                    "Instructor for CS6260: Applied Cryptography (Fall 2022, Spring 2023)",
                    "Instructor for CS2600: Intro to Artificial Intelligence (Spring 2022)",
                    "Held weekly office hours, graded assignments and exams, and reviewed projects",
                  ],
                },
                {
                  company: "CSX Technology",
                  role: "Security Infrastructure Technology Intern",
                  period: "Jun 2022 - Aug 2022",
                  description: [
                    "Performed proof of concept for Cloud security posture management solution",
                    "Collaborated with GRC team for daily threat intel exercises, threat modelling, and access control",
                    "Evaluated and deployed Microsoft Defender for cloud and worked with Azure, GCP and AWS",
                  ],
                },
              ].map((job, index) => (
                <div key={index} className="border-l-2 border-[#64ffda] pl-6">
                  <h3 className="text-xl font-semibold text-[#ccd6f6]">
                    {job.role}{" "}
                    <span className="text-[#64ffda]">@ {job.company}</span>
                  </h3>
                  <p className="text-sm text-[#8892b0] mb-4">{job.period}</p>
                  <ul className="space-y-2 text-[#8892b0]">
                    {job.description.map((item, i) => (
                      <li key={i} className="flex">
                        <span className="text-[#64ffda] mr-3 mt-1">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-8">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] mr-2">04.</span> Some Things I've Built
              <div className="ml-4 h-[1px] bg-[#233554] flex-grow"></div>
            </h2>
            <div className="grid md:grid-cols-1 gap-8">
              {[
                {
                  title: "Nebula - Multi-Cloud Offensive Toolkit",
                  description:
                    "Co-developed an open-source offensive toolkit enabling rapid, automated enumeration and analysis across AWS, Azure, and GCP. Built modular components supporting cloud mapping, misconfiguration detection, and attack-path discovery.",
                  tech: ["Go", "AWS", "Azure", "GCP", "Cloud Security"],
                },
                {
                  title: "Distributed System Security",
                  description:
                    "Developed a secure shared-store service enabling multi-user document storage and retrieval across distributed local machines with robust security controls.",
                  tech: ["Python", "Distributed Systems", "Cryptography"],
                },
                {
                  title: "Malware Analysis - Greencat",
                  description:
                    "Reverse engineered the Greencat malware, producing detailed documentation, control-flow graphs, and a custom def-use plugin for IDA Pro.",
                  tech: ["Assembly", "C", "IDA Pro", "Ghidra"],
                },
                {
                  title: "Advanced Keylogger & Backdoor",
                  description:
                    "Built a low-CPU-usage keylogger with extended capabilities and developed a Windows backdoor deployed from Kali Linux for security research purposes.",
                  tech: ["Python", "Kali Linux", "Windows Security"],
                },
                {
                  title: "Active & Passive Information Gathering",
                  description:
                    "Conducted comprehensive reconnaissance on live websites and local environments, delivering detailed reports on findings and penetration testing techniques.",
                  tech: ["Nmap", "Kali Linux", "Metasploit", "OSINT"],
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-[#112240] rounded-lg p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#8892b0] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-[#64ffda] bg-[#0a192f] px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Garden Section */}
          <section id="garden" className="py-8">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8 flex items-center">
              <span className="text-[#64ffda] mr-2">05.</span> A Little Bit More About Me
              <div className="ml-4 h-[1px] bg-[#233554] flex-grow"></div>
            </h2>
            <div className="text-[#8892b0] space-y-4 mb-8">
              <p>
                I grew up dancing and playing all sorts of sports, and now, like any proper mid-20s person,
                I've predictably fallen into the running-and-traveling lifestyle while collecting hobbies left and right.
              </p>
              <p>
                Currently attempting to learn tennis (because apparently I enjoy public humiliation) and getting back
                into dancing - which thankfully is going much better since I actually know what I'm doing there!
              </p>
              <p>
                But hey, at least tennis keeps things interesting... and my ego properly humbled.
              </p>
            </div>
            <h3 className="text-2xl font-bold text-[#ccd6f6] mb-6">Virtual Garden</h3>
            <Garden />
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-8">
            <div className="text-center">
              <p className="text-[#64ffda] mb-4">06. What's Next?</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#ccd6f6] mb-6">
                Get In Touch
              </h2>
              <p className="text-[#8892b0] mb-12 leading-relaxed">
                I am here to make some smart friends. Reach out if you want to discuss security!
              </p>
              <a
                href="mailto:aarushidwivedi799@gmail.com"
                className="inline-block px-8 py-4 border-2 border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-all"
              >
                Say Hello
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center mb-4">
          <a
            href="https://www.linkedin.com/in/aarushi-dwivedi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-[#8892b0] text-sm">Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
