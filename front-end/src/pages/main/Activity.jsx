import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { ActivityComp } from "../../components/ActivityComp";
export const Activity = () => {
    return (
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="flex flex-row pt-16 gap-1">
          <LeftBar />
          <div className="flex flex-row lg:ml-[18%] w-[100%]">
            <div className="w-[100%] lg:w-[70%] px-5 mt-2 flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-semibold">Activity</h1>
                    <div className="flex flex-col gap-5 mt-8">
                        <ActivityComp />
                        <ActivityComp />
                        <ActivityComp />
                    </div>
                </div>
            </div>
            <div className="lg:w-[30%]">
              <RightBar />
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <BottomBar />
        </div>
      </div>
    );
  };
  