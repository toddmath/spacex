import { useState, useMemo } from "react";

type Noop = () => void;

export type UseToggle = Readonly<{
  isToggled: boolean;
  isNotToggled: boolean;
  toggle: Noop;
  toggleTrue: Noop;
  toggleFalse: Noop;
}>;

function useToggle(initState = false): UseToggle {
  const [isToggled, setIsToggled] = useState(initState);

  return useMemo(
    () =>
      ({
        isToggled,
        isNotToggled: !isToggled,
        toggle: () => setIsToggled((toggled) => !toggled),
        toggleTrue: () => setIsToggled(true),
        toggleFalse: () => setIsToggled(false),
      } as const),
    [isToggled]
  );
}

export default useToggle;
