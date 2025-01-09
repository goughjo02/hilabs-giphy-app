"use client";

import { useEffect, useRef } from "react";
import { select } from "d3";

type LikeIconProps = {
  isLiked: boolean;
};

export const LikeIcon = ({ isLiked }: LikeIconProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (svgRef.current) {
      const svg = select(svgRef.current);
      svg
        .selectAll("path")
        .data([isLiked])
        .join("path")
        .attr(
          "d",
          "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        )
        .attr("fill", "#ff0000")
        .attr("stroke", "currentColor")
        .attr("strokeWidth", "2")
        .attr("stroke-dasharray", "1000")
        .attr("stroke-dashoffset", "1000");

      svg
        .selectAll("path")
        .transition()
        .duration(0)
        .attr("stroke-dashoffset", "1000")
        .transition()
        .duration(isLiked ? 1000 : 0)
        .attr("stroke-dashoffset", "0")
        .attr("fill-opacity", isLiked ? "1" : "0")
        .transition()
        .duration(0);
    }
  }, [isLiked]);

  return <svg ref={svgRef} viewBox="0 0 24 24"></svg>;
};
