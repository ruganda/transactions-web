import { render, screen } from "@testing-library/react";
import App from "../App";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UnmatchedReport from "../components/UnmatchedReport";
import UploadFiles from "../components/UploadFiles";
import ComparisonResults from "../components/ComparisonResults";
import data from "./testData.json";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("Should render The main App component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBeTruthy;
  });
});

describe("<UploadFiles />", () => {
  const setfile1 = jest.fn();
  const setfile2 = jest.fn();
  const handleSubmit = jest.fn()

  const props = { 
    setfile1,
    setfile2,
    handleSubmit
  }

  it("Should render Uploadfiles component", () => {
    
    const wrapper = shallow(<UploadFiles {...props} />);
    expect(wrapper.length).toBeTruthy;
  });

  it("simulates change event on file1 when uploading files", () => {
    const setfile1 = jest.fn();
    const wrapper = shallow(<UploadFiles {...props} setfile1={setfile1} />);
    const event = {
      target: {
        files: [{ name: "file1", type: "text/csv" }],
      },
    };
    wrapper.find("#file1").simulate("change", event);
    expect(setfile1).toHaveBeenCalled();
  });

  it("simulates change event on file2 when uploading files", () => {
    const setfile2 = jest.fn();

    const wrapper = shallow(<UploadFiles {...props } setfile2={setfile2}/>);
    const event = {
      target: {
        files: [{ name: "file2", type: "text/csv" }],
      },
    };
    wrapper.find("#file2").simulate("change", event);
    expect(setfile2).toHaveBeenCalled();
  });

  it("simulates Submit events when uploading files", () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <UploadFiles {...props} handleClick={handleClick} file={"file1"} />
    );
    const event = {
      target: {
        files: ["file1", "file2"],
      },
    };
    wrapper.find("button").simulate("submit", event);
    console.log("submit");
    expect(event.target.files).toHaveLength(2);
  });
});

describe("<ComparisonResults />", () => {
  it("Should render ComparisonResults component", () => {
    const setshowUnmatched = jest.fn();
    const wrapper = shallow(<ComparisonResults data={data} setshowUnmatched={setshowUnmatched} />);
    expect(wrapper.length).toBeTruthy;
  });

  it("Should simulate unmatched results button click ", () => {
    const setshowUnmatched = jest.fn();
    const wrapper = shallow(
      <ComparisonResults data={data} setshowUnmatched={setshowUnmatched} />
    );
    wrapper.find("button").simulate("click");
    expect(setshowUnmatched).toHaveBeenCalled();
  });
});

describe("<UnmatchedReport />", () => {
  it("Should render UnmatchedReport component", () => {
    const wrapper = shallow(<UnmatchedReport data={data} />);
    expect(wrapper.length).toBeTruthy;
  });

  it("Should test click on a transaction with 1 close match ", () => {
    const id = data[0].Unmatched[0].id
    const wrapper = shallow(<UnmatchedReport data={data} />);
    expect(wrapper.find('.close-matches')).toHaveLength(0);
    wrapper.find('#tablerow1').at(0).simulate('click');

    expect(wrapper.find('.close-matches')).toHaveLength(1);
  });

  it("Should test click on a transaction with no close matches", () => {

    const wrapper = shallow(<UnmatchedReport data={data} />);
    wrapper.find('#tablerow14').at(0).simulate('click');


  });
});
