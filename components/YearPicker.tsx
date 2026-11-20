import { useState } from "react";

type YearPickerProps = {
    value?: number;
    onSelect: (year: number) => void;
};

export default function YearPicker({
    value,
    onSelect,
}: YearPickerProps) {
    const currentYear = new Date().getFullYear();

    const initialDecade =
        Math.floor((value ?? currentYear) / 10) * 10;

    const [decade, setDecade] = useState(initialDecade);

    const years = Array.from(
        { length: 12 },
        (_, i) => decade - 1 + i
    );

    return (
        <div className="w-full max-w-md  bg-(--surface) p-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setDecade((d) => d - 10)}
                    className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            hover:bg-(--surface2)
            transition
          "
                >
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>

                <h2 className="font-semibold text-lg">
                    {decade} - {decade + 9}
                </h2>

                <button
                    onClick={() => setDecade((d) => d + 10)}
                    className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            hover:bg-(--surface2)
            transition
          "
                >
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>

            {/* Years Grid */}
            <div className="grid grid-cols-4 gap-2">
                {years.map((year) => {
                    const selected = year === value;
                    const isOutside =
                        year < decade || year > decade + 9;

                    return (
                        <button
                            key={year}
                            onClick={() => onSelect(year)}
                            className={`
                p-2 rounded-md
                font-medium
                transition-all

                ${selected
                                    ? `
                      bg-(--primary)
                      text-white
                      shadow-lg
                      scale-105
                    `
                                    : `
                      bg-(--surface2)
                      hover:bg-(--surface-hover)
                      text-(--text)
                    `
                                }

                ${isOutside
                                    ? "opacity-40"
                                    : ""
                                }
              `}
                        >
                            {year}
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => onSelect(currentYear)}
                    className="
            px-4 py-2
            rounded-md
            bg-(--surface2) hover:bg-(--surface-hover)
            transition
          "
                >
                    Today ({currentYear})
                </button>
            </div>
        </div>
    );
}