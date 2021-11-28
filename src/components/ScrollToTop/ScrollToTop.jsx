import { useEffect } from "react";
import { useLocation, useHistory } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  const history = useHistory();

  // this is not working; I'm not sure what needs to be done to get it to work;

  // const pathname = window.location.hash.split('#')[1]
  // const pathname = window.location.pathname;
  // console.log('THIS IS THE PATHNAME:', pathname);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;


// import React, { useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import { withRouter } from "react-router-dom";


// function ScrollToTop() {
//   const history = useHistory();
//   const location = useLocation();
//   // const pathname = window.location.hash.split('#')[1]
//   const pathname = window.location.pathname;
//   console.log('THIS IS THE PATHNAME:', pathname);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return null;
// }

// export default ScrollToTop;

// [history.push(pathname)]);

// function usePageViews() {
//   let location = useLocation();
//   React.useEffect(() => {
//     ga.send(["pageview", location.pathname]);
//   }, [location]);
// }



// class ScrollToTop extends React.Component {
//   componentDidUpdate(prevProps) {
//     if (
//       this.props.location.pathname !== prevProps.location.pathname
//     ) {
//       window.scrollTo(0, 0);
//     }
//   }

//   render() {
//     return null;
//   }
// }


// export default withRouter(ScrollToTop);
// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <App />
//     </Router>
//   );
// }



// function ScrollToTopOnMount() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return null;
// }


// // Render this somewhere using:
// // <Route path="..." children={<LongContent />} />
// function LongContent() {
//   return (
//     <div>
//       <ScrollToTopOnMount />

//       <h1>Here is my long content page</h1>
//       <p>...</p>
//     </div>
//   );
// }


// class ScrollToTopOnMount extends React.Component {
//   componentDidMount() {
//     window.scrollTo(0, 0);
//   }

//   render() {
//     return null;
//   }
// }

// // Render this somewhere using:
// // <Route path="..." children={<LongContent />} />
// class LongContent extends React.Component {
//   render() {
//     return (
//       <div>
//         <ScrollToTopOnMount />

//         <h1>Here is my long content page</h1>
//         <p>...</p>
//       </div>
//     );
//   }
// }