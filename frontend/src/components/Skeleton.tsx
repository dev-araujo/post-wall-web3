import "../styles/Skeleton.css";

import { SkeletonInterface } from "../interfaces/Skeleton";

const Skeleton = ({
  height,
  width,
}: SkeletonInterface) => {
  const skeletonStyle:any = {
    height,
    width,
  };


  return <div className="skeleton" style={skeletonStyle} />;
};

export default Skeleton;
