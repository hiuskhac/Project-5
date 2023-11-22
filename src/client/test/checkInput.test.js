import { checkValidDate } from "../js/inputChecker";

describe("Test Valid Date", function () {
  it("Should return false with invalid data", function () {
    const getElementByIdMock = jest.spyOn(document, "getElementById");
    getElementByIdMock.mockReturnValue({ innerHTML: "" });
    const dateInput = "2023-01-01";
    const result = checkValidDate(dateInput);
    expect(result).toBe(false);
    expect(getElementByIdMock).toHaveBeenCalledWith("error");
    expect(document.getElementById("error").innerHTML).toBe(
      "The travel date input must be a time after the current date."
    );
    getElementByIdMock.mockRestore();
  });
});
