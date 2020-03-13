import React from "react";
import { Switch } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";

/**
 * This component is used to control the routing animation.
 * It controls what should happen after animation complete (onRest).
 * It differs animation direction based on routePopped props. (Set in router.action.js and available from routerReducer).
 * @param location React router location used as key in Switch
 * @param children All routes (set in Routes.js)
 * @param routePopped Used to manage direction of animation
 * @param rest All other props sent down
 */
export const AnimatedSwitch = ({ location, children, ...rest }) => {
  /** Set reverse however you want.
      I'm using a redux variable for back btn clicked.
      This is just an example to alternate animation
   */
  const reverse = location.pathname === "/";

  return (
    <PoseGroup
      // animateOnMount={true} <- This makes the first render run an animation
      flipMove={false}
      preEnterPose={reverse ? "leftSide" : "rightSide"}
      exitPose={reverse ? "rightSide" : "leftSide"}
    >
      <ContextRouteAnimation key={location.pathname} reverse={reverse}>
        <Switch location={location} {...rest}>
          {children}
        </Switch>
      </ContextRouteAnimation>
    </PoseGroup>
  );
};

export default React.memo(AnimatedSwitch);

// Different timings for animations, try to change these up.
export const TIMING = {
  INSTANT: 0,
  FAST: 200,
  NORMAL: 400,
  SLOW: 400
};

/**
 * Try to change up the different commented values for varying animatmions
 *
 * The commented-out exit object:
 * Test this while removing <PoseGroup exitPose /> prop.
 * It defaults to exit and instead of the page sliding out,
 * it will stay and fade.
 */
export const ContextRouteAnimation = posed.div({
  enter: {
    x: 0,
    // opacity: 1,
    // scale: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: TIMING.SLOW
    }
  },
  // exit: {
  //   // x: 0,
  //   opacity: 0,
  //   // scale: 1,
  //   transition: {
  //     type: "tween",
  //     ease: "easeInOut",
  //     duration: TIMING.SLOW
  //   }
  // },
  leftSide: {
    x: "-100%",
    // opacity: 0,
    // scale: 1.5,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: TIMING.SLOW
    }
  },
  rightSide: {
    x: "100%",
    // opacity: 0,
    // scale: 1.5,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: TIMING.SLOW
    }
  }
});
