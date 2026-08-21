import React from "react";
import Header from "../../Components/Header/Header";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main id="main-content" tabIndex={-1} className="max-w-[90vw] w-full mx-auto pt-[80px] md:pt-[130px] pb-[100px] min-h-[60vh]">
        <h1 className="font-counture text-[#00688F] text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] mb-8">
          Policies
        </h1>
        <div className="font-unageo-medium text-[16px] md:text-[18px] space-y-12">
          {/* First Policy: Accessibility */}
          <div className="space-y-6">
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] text-[#00688F] border-b pb-2">
              Accessibility Plan and Policies for{" "}
              <span className="underline">Mariani Metal Fabricators Ltd.</span>
            </h2>
            <p className="italic text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              This 2024 accessibility plan outlines the policies and actions
              that Mariani Metal Fabricators Ltd. has or will put in place to
              improve opportunities for people with disabilities.
            </p>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Statement of Commitment
              </h3>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. is committed to treating all
                people in a way that allows them to maintain their dignity and
                independence. We believe in integration and equal opportunity.
                We are committed to meeting the needs of people with
                disabilities in a timely manner and will do so by preventing and
                removing barriers to accessibility and meeting accessibility
                requirements under the Accessibility for Ontarians with
                Disabilities Act (“AODA”).
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Accessible Emergency Information
              </h3>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. is committed to providing the
                customers and clients with publicly available emergency
                information in an accessible way upon request. We will also
                provide employees with disabilities with individualized
                emergency response information when necessary.
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Training
              </h3>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will provide training to
                employees, volunteers, and other staff members on Ontario's
                accessibility laws and on the Human Rights Code as it relates to
                people with disabilities. Training will be provided in a way
                that best suits the duties of employees, volunteers, and other
                staff members.
              </p>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will take the necessary steps to
                ensure employees are provided with the training needed to comply
                with the AODA.
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Information and Communications
              </h3>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. is committed to meeting the
                communication needs of people with disabilities. We will consult
                with people with disabilities to determine their information and
                communication needs.
              </p>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will take the necessary steps to
                make ensure existing feedback processes are accessible to people
                with disabilities upon request in accordance with the AODA.
              </p>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will take the necessary steps to
                make sure all publicly available information is made accessible
                upon request in accordance with the AODA.
              </p>
              <p className="bg-gray-100 p-4 border-l-4 border-[#00688F] text-sm italic rounded mt-4 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                We will take the necessary steps to make all new websites and
                content on those sites conform with the requirements of the
                AODA. Our website is currently being evaluated to be compliant
                with WCAG 2.0, Level AA.
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Employment
              </h3>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. is committed to fair and
                accessible employment practices and will take the necessary
                steps to notify the public and staff that, when requested,
                Mariani Metal Fabricators Ltd. will accommodate people with
                disabilities during the recruitment and assessment processes and
                when people are hired.
              </p>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. Will take the necessary steps to
                develop and put in place a process for developing individual
                accommodation plans and return-to-work policies for employees
                that have been absent due to a disability in accordance with the
                AODA.
              </p>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will take the necessary steps to
                ensure the accessibility needs of employees with disabilities
                are taken into account if is using performance management,
                career development and redeployment processes in accordance with
                the AODA.
              </p>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Mariani Metal Fabricators Ltd. will take the necessary steps to
                prevent and remove other accessibility barriers identified in
                accordance with the AODA.
              </p>
            </section>
          </div>

          <hr className="border-t-2 border-gray-200" />

          {/* Second Policy: Fraudulent Job Ads */}
          <div className="space-y-6">
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] text-[#00688F] border-b pb-2">
              Policy Regarding the Handling of Fraudulent Job Ads
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <span className="font-unageo-medium">Effective Date:</span> December
              8, 2025
            </p>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Purpose
              </h3>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                This policy outlines the procedures for identifying, handling,
                and reporting fraudulent job advertisements that misuse our
                company's name or are posted on our internal/external platforms,
                to protect job seekers and our organization's reputation.
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Scope
              </h3>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                This policy applies to all employees, job applicants, and users
                of our job posting platforms.
              </p>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Policy Statements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  <span className="font-unageo-medium">Official Postings:</span>{" "}
                  All legitimate job opportunities with MARIANI METAL
                  FABRICATORS LTD. are exclusively listed on our official
                  careers page at select legitimate job boards. We will never
                  post jobs solely through unofficial channels like generic
                  email providers or instant messaging services.
                </li>
                <li>
                  <span className="font-unageo-medium">No Fees:</span> MARIANI
                  METAL FABRICATORS LTD. will never request payment, financial
                  information (e.g., banking details, credit card numbers, SIN)
                  or equipment fees as a condition of employment or a part of
                  the application process.
                </li>
                <li>
                  <span className="font-unageo-medium">Hiring Process:</span> A
                  formal interview process (which may include video or in-person
                  interviews) is always conducted before a formal job offer is
                  extended. Job offers are provided in writing.
                </li>
                <li>
                  <span className="font-unageo-medium">
                    Employee Responsibility:
                  </span>{" "}
                  Employees who become aware of a suspicious posting or receive
                  inquiries about potentially fraudulent ads must report them
                  immediately to the Human Resources (HR) department or the
                  designated internal contact.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Procedure for Handling Reports
              </h3>

              <h4 className="font-unageo-medium mt-4 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Reporting Mechanism:
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  <span className="font-unageo-medium">
                    External Job Seekers:
                  </span>{" "}
                  Job seekers can report suspicious job ads allegedly from
                  MARIANI METAL FABRICATORS LTD. through a dedicated email
                  address.
                </li>
                <li>
                  <span className="font-unageo-medium">Internal Staff:</span>{" "}
                  Employees must report any suspicious activity immediately to
                  the HR department.
                </li>
              </ul>

              <h4 className="font-unageo-medium mt-4 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">Investigation:</h4>
              <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  The HR department will investigate all reports to verify the
                  legitimacy of the posting.
                </li>
                <li>
                  We will attempt to identify the source of the fraudulent post,
                  if possible.
                </li>
              </ul>

              <h4 className="font-unageo-medium mt-4 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Action and External Reporting:
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  If a posting is confirmed as fraudulent, we will immediately
                  contact the external platform (e.g., job board administrator)
                  where it was posted and request its removal.
                </li>
                <li>
                  We will report the fraud to the relevant authorities, such as
                  the Canadian Anti-Fraud Centre (CAFC).
                </li>
                <li>
                  We will cooperate with law enforcement in any investigation.
                </li>
              </ul>

              <h4 className="font-unageo-medium mt-4 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                Communication and Prevention:
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  We will post disclaimers on our official channels, warning job
                  seekers about recruitment fraud and providing tips to protect
                  themselves.
                </li>
                <li>
                  We will advise victims to monitor their bank accounts and
                  credit reports and report the incident to their financial
                  institutions and the CAFC.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
                Sample Report of a Fraudulent Job Ad
              </h3>
              <p className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                If you encounter a suspicious job ad, use this template to
                gather information when reporting it:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
                <li>
                  <span className="font-unageo-medium">
                    Platform where the ad was found:
                  </span>{" "}
                  (e.g., Indeed, LinkedIn, Facebook, etc.)
                </li>
                <li>
                  <span className="font-unageo-medium">Exact job title:</span>{" "}
                  (e.g., "welder")
                </li>
                <li>
                  <span className="font-unageo-medium">
                    MARIANI METAL FABRICATORS LTD. used in the ad:
                  </span>{" "}
                  (e.g., "Acme Corp")
                </li>
                <li>
                  <span className="font-unageo-medium">
                    Contact information provided:
                  </span>{" "}
                  (e.g., email address like hiring@gmail.com, phone number,
                  "Hiring Manager" name)
                </li>
                <li>
                  <span className="font-unageo-medium">
                    Description of the fraudulent activity:
                  </span>{" "}
                  (e.g., "They asked me to send money for a background check" or
                  "The email contained numerous spelling errors and requested my
                  SIN immediately")
                </li>
                <li>
                  <span className="font-unageo-medium">
                    Any links included in the ad:
                  </span>{" "}
                  (e.g., scam-site.com)
                </li>
                <li>
                  <span className="font-unageo-medium">
                    Your contact information:
                  </span>{" "}
                  (optional, but helpful for follow-up) Name, email, phone
                  number.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <ScrollToTop/>
      <Footers />
      <MobileFooters />
    </>
  );
}
