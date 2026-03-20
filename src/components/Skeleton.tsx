import React, { memo } from 'react';
const Pulse = ({ className }: { className: string }) => (
    <div className={`animate-pulse rounded-xl bg-white/8 ${className}`} />
);

const Skeleton = memo(function Skeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left */}
            <div className="lg:col-span-1 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 flex flex-col gap-6 min-h-[440px]">
                <div className="flex flex-col gap-2">
                    <Pulse className="h-5 w-40" />
                    <Pulse className="h-4 w-28" />
                </div>
                <div className="flex flex-col items-center gap-4 flex-1 justify-center">
                    <Pulse className="w-28 h-28 rounded-full" />
                    <Pulse className="h-16 w-36" />
                    <Pulse className="h-5 w-28" />
                </div>
                <div className="flex justify-center gap-10">
                    <Pulse className="h-8 w-14" />
                    <Pulse className="h-8 w-14" />
                </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Highlights */}
                <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                    <Pulse className="h-4 w-32 mb-5" />
                    <div className="grid grid-cols-2 gap-3">
                        <Pulse className="col-span-2 h-24 rounded-2xl" />
                        <Pulse className="h-24 rounded-2xl" />
                        <Pulse className="h-24 rounded-2xl" />
                        <Pulse className="h-24 rounded-2xl" />
                        <Pulse className="h-24 rounded-2xl" />
                    </div>
                </div>
                {/* Forecast */}
                <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                    <Pulse className="h-4 w-28 mb-5" />
                    <div className="flex flex-col gap-2">
                        <Pulse className="h-14 rounded-2xl" />
                        <Pulse className="h-14 rounded-2xl" />
                        <Pulse className="h-14 rounded-2xl" />
                        <Pulse className="h-14 rounded-2xl" />
                        <Pulse className="h-14 rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Skeleton;