import React from 'react';

import clsx from 'clsx';

const COLORS = {
  A: 'hsl(0.00, 70%, 50%)',
  B: 'hsl(13.85, 70%, 50%)',
  C: 'hsl(27.69, 70%, 50%)',
  D: 'hsl(41.54, 70%, 50%)',
  E: 'hsl(55.38, 70%, 50%)',
  F: 'hsl(69.23, 70%, 50%)',
  G: 'hsl(83.08, 70%, 50%)',
  H: 'hsl(96.92, 70%, 50%)',
  I: 'hsl(110.77, 70%, 50%)',
  J: 'hsl(124.62, 70%, 50%)',
  K: 'hsl(138.46, 70%, 50%)',
  L: 'hsl(152.31, 70%, 50%)',
  M: 'hsl(166.15, 70%, 50%)',
  N: 'hsl(180.00, 70%, 50%)',
  O: 'hsl(193.85, 70%, 50%)',
  P: 'hsl(207.69, 70%, 50%)',
  Q: 'hsl(221.54, 70%, 50%)',
  R: 'hsl(235.38, 70%, 50%)',
  S: 'hsl(249.23, 70%, 50%)',
  T: 'hsl(263.08, 70%, 50%)',
  U: 'hsl(276.92, 70%, 50%)',
  V: 'hsl(290.77, 70%, 50%)',
  W: 'hsl(304.62, 70%, 50%)',
  X: 'hsl(318.46, 70%, 50%)',
  Y: 'hsl(332.31, 70%, 50%)',
  Z: 'hsl(346.15, 70%, 50%)',
};

export type Alphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

const DEFAULT_COLOR = 'hsl(360, 67%, 70%)';

interface IProps {
  letter: string;
}

const ProfileImage: React.FC<IProps> = ({ letter }) => {
  const backgroundColor = COLORS[letter as Alphabet] || DEFAULT_COLOR;

  return (
    <div
      className={clsx(
        'w-full h-full text-[1em] text-white flex items-center justify-center'
      )}
      style={{ background: backgroundColor }}
    >
      {letter?.toUpperCase() || letter}
    </div>
  );
};

export default ProfileImage;
