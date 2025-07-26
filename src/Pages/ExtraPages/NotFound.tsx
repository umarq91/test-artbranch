import PageMeta from "Components/PageMeta";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-black">
      <section className="hero relative h-[1438px] overflow-hidden bg-grey-1 pt-[184px] px-safe lg:h-[1078px] lg:pt-28 md:h-auto md:pt-24 sm:pt-[92px]">
        <div className="container relative flex h-full flex-col">
          <h1 className="relative z-30 max-w-[616px] bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text font-title text-84 font-semibold leading-[0.9] tracking-tight text-transparent lg:max-w-[528px] lg:text-72 md:max-w-[441px] md:text-56 sm:max-w-64 sm:text-32">
            Everything App for&nbsp;your teams
          </h1>
          
          <p className="relative z-30 mt-5 max-w-md text-18 leading-snug tracking-tight text-grey-90 lg:mt-4 md:mt-3.5 md:text-16 sm:mt-3 sm:max-w-[248px] sm:text-15">
            Huly, an open-source platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.
          </p>
          
          <div className="mt-11 lg:mt-9 md:mt-7 sm:mt-5">
            <div className="relative inline-flex items-center z-10">
              <div className="border-button-light-blur absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform" style={{ opacity: 1 }}>
                <div className="border-button-light relative h-full w-full rounded-full"></div>
              </div>
              <div className="border-button-light-blur absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] -translate-x-1/2 -translate-y-1/2 scale-x-[-1] transform rounded-full will-change-transform" style={{ opacity: 0 }}>
                <div className="border-button-light relative h-full w-full rounded-full"></div>
              </div>
              <a className="transition-colors duration-200 transition-all duration-200 uppercase font-bold flex items-center justify-center h-10 px-16 text-12 text-black -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] space-x-1 sm:pl-[59px] sm:pr-[52px]" href="/signup">
                <div className="absolute -z-10 flex w-[204px] items-center justify-center" style={{ transform: 'translateX(105.953px) translateZ(0px)' }}>
                  <div className="absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,_#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]"></div>
                  <div className="absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2 bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,_#FFFFF7_29%,_#FFFACD_48.5%,_#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)] blur-[5px]"></div>
                </div>
                <span className="text-[#5A250A]">Try it Free</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9" className="h-[9px] w-[17px] text-[#5A250A]">
                  <path fill="currentColor" fillRule="evenodd" d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-6 aspect-[1.067842] w-[1574px] max-w-none lg:-bottom-[39px] lg:left-0 lg:w-[1220px] md:relative md:bottom-0 md:top-7 md:mb-6 md:mt-[-36%] md:w-[120%] sm:-top-3 sm:mb-[-15%] sm:mt-0 sm:w-full xs:top-1.5 xs:mb-2 xs:min-h-[350px] 2xs:aspect-auto">
            <div className="absolute -left-[344px] bottom-0 z-0 aspect-[1.335187] w-[1920px] max-w-none mix-blend-lighten lg:bottom-[23px] lg:left-[-253px] lg:w-[1620px] md:bottom-[-2.1%] md:left-[-27%] md:w-[147%] sm:bottom-[5.4%] sm:left-[-34.95%] sm:w-[189%] xs:bottom-[1.9%] xs:left-[-36.2%] xs:w-[190%] xs:min-w-[704px] 2xs:bottom-[18px] 2xs:left-[-132px] before:absolute before:top-0 before:z-10 before:hidden before:h-20 before:w-full before:bg-gradient-to-b before:from-grey-1 before:to-grey-1/0 sm:before:block">
              <video className="absolute inset-0 w-full h-full" width="1920" height="1438" autoPlay loop playsInline style={{ opacity: 1 }}>
                <source src="/videos/pages/home/hero/hero.mp4?updated=20240607144404" type="video/mp4" />
                <source src="/videos/pages/home/hero/hero.webm?updated=20240607144404" type="video/webm" />
              </video>
            </div>
            
            <div className="relative h-full mix-blend-overlay [clip-path:circle(var(--hero-mask-size)_at_var(--hero-mask-x)_var(--hero-mask-y))] lg:-top-2 lg:left-28 lg:w-[93%] md:hidden">
              <img alt="" loading="lazy" width="1574" height="1474" decoding="async" data-nimg="1" className="absolute w-full max-w-none [mask-image:radial-gradient(var(--hero-mask-size)_at_var(--hero-mask-x)_var(--hero-mask-y),black_20%,transparent)]" style={{ color: 'transparent' }} src="/_next/static/media/0f9e183a12bee7af6da9f9a175c71d3a.svg" />
              <img alt="" loading="lazy" width="1574" height="1474" decoding="async" data-nimg="1" className="absolute z-10 w-full max-w-none [mask-image:radial-gradient(var(--hero-mask-size)_at_var(--hero-mask-x)_var(--hero-mask-y),black_20%,transparent)]" style={{ color: 'transparent' }} src="/_next/static/media/e4c3a7bd600393b1420b0ffef056534d.svg" />
            </div>
            
            <img alt="" fetchPriority="high" width="1024" height="569" decoding="async" data-nimg="1" className="absolute bottom-[141px] left-2 rounded-t-[10px] lg:bottom-[138px] lg:left-9 lg:w-[873px] md:bottom-[9.5%] md:left-0 md:w-[78.4%] md:rounded-t-md sm:relative sm:bottom-auto sm:mt-[18.7%] sm:w-[100.5%] sm:min-w-[100.5%] sm:rounded-t xs:mt-[21.6%] xs:w-full xs:min-w-[376px] 2xs:mt-[70px]" style={{ color: 'transparent' }} sizes="100vw" srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-illustration.7100a376.jpg&amp;w=3840&amp;q=75" />
          </div>
          
          <div className="absolute bottom-[88px] z-30 overflow-hidden text-14 tracking-snugger lg:bottom-14 md:bottom-12 md:text-13 sm:bottom-9 sm:left-5 sm:right-0 sm:text-12 xs:left-0 xs:before:absolute xs:before:bottom-0 xs:before:left-0 xs:before:z-10 xs:before:h-5 xs:before:w-[90px] xs:before:bg-[linear-gradient(90deg,#090A0C_28.3%,rgba(9,10,12,0)_100%)] xs:after:absolute xs:after:bottom-0 xs:after:right-0 xs:after:z-10 xs:after:h-5 xs:after:w-[90px] xs:after:bg-[linear-gradient(270deg,#090A0C_28.3%,rgba(9,10,12,0)_100%)]">
            <p className="mb-3.5 font-light leading-none text-white/60 will-change-transform md:mb-3 xs:pl-5">Everything you need for productive team work:</p>
            <div className="w-full xs:flex xs:overflow-hidden">
              <ul className="flex flex-shrink-0 font-semibold leading-dense text-white will-change-transform xs:animate-infinityScroll">
                <li className="relative sm:shrink-0 xs:before:relative xs:before:mx-2 xs:before:inline-block xs:before:aspect-square xs:before:w-[3px] xs:before:rounded-full xs:before:bg-white/30 xs:before:align-middle">Team Planner</li>
                <li className="relative sm:shrink-0 before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:before:mx-2">Project Management</li>
                <li className="relative sm:shrink-0 before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:before:mx-2">Virtual Office</li>
                <li className="relative sm:shrink-0 before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:before:mx-2">Chat</li>
                <li className="relative sm:shrink-0 before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:before:mx-2">Documents</li>
                <li className="relative sm:shrink-0 before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:before:mx-2">Inbox</li>
              </ul>
              <ul className="hidden flex-shrink-0 font-semibold leading-dense text-white will-change-transform xs:flex xs:animate-infinityScroll">
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Team Planner</li>
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Project Management</li>
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Virtual Office</li>
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Chat</li>
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Documents</li>
                <li className="relative before:relative before:mx-2.5 before:inline-block before:aspect-square before:w-[3px] before:rounded-full before:bg-white/30 before:align-middle sm:shrink-0 sm:before:mx-2">Inbox</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[340px] w-full bg-gradient-to-b from-grey-1/0 to-grey-1 to-50% lg:h-[250px] md:h-44 sm:left-0 sm:h-[170px] sm:w-[107%] xs:h-[28%]"></div>
      </section>
    </div>
  );
}