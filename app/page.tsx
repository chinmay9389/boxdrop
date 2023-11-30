import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Boxdrop. <br />
            <br />
            Store your data in a single place access it from anywhere.
          </h1>
          <p className="pb-20">
            Enhance your personal storage with box drop. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Voluptate quibusdam doloribus ad
            numquam fugiat excepturi omnis sunt cupiditate sequi exercitationem.
          </p>
          <Link href="/dashboard" className="flex bg-blue-500 p-5 w-fit">
            Try it for Free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </main>
  );
}
