
import { Building2, Award, Calendar, Percent, ShieldCheck, Phone, Server, Globe } from "lucide-react";

interface CasinoAtGlanceProps {
  casino: {
    company: string;
    headquarters: string;
    licenseInfo: string;
    yearEstablished: number;
    withdrawalRate: string;
    playerProtection: string;
    customerService: string;
    gameProviders: string[];
    gameCount: string;
    rtpTest: string;
    name: string;
  };
}

const CasinoAtGlance = ({ casino }: CasinoAtGlanceProps) => {
  return (
    <div className="mb-12">
      <h2 id="at-a-glance" className="text-3xl font-bold mb-6 text-center scroll-mt-24">{casino.name} at a Glance</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-6 space-y-5">
            <div className="flex items-start">
              <Building2 className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Company:</p>
                <p className="text-sm font-medium text-gray-900">{casino.company}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Award className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Gambling License:</p>
                <p className="text-sm font-medium text-gray-900">{casino.licenseInfo}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Online since:</p>
                <p className="text-sm font-medium text-gray-900">{casino.yearEstablished}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Percent className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Payout Rate:</p>
                <p className="text-sm font-medium text-gray-900">{casino.withdrawalRate}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Player Protection:</p>
                <p className="text-sm text-right font-medium text-gray-900">{casino.playerProtection}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-5">
            <div className="flex items-start">
              <Globe className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Headquarters:</p>
                <p className="text-sm font-medium text-gray-900">{casino.headquarters}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Server className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Provider:</p>
                <p className="text-sm text-right font-medium text-gray-900">{casino.gameProviders.join(", ")}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Globe className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Game Selection:</p>
                <p className="text-sm font-medium text-gray-900">{casino.gameCount}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Percent className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">RTP Test:</p>
                <p className="text-sm font-medium text-gray-900">{casino.rtpTest}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0 mr-4" />
              <div className="flex flex-grow justify-between">
                <p className="text-sm text-gray-600">Customer Service:</p>
                <p className="text-sm font-medium text-gray-900">{casino.customerService}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoAtGlance;
