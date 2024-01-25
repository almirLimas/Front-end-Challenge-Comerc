import { mount } from "@vue/test-utils";
import InputText from "@/components/InputText.vue";

describe("MyTextInput", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(InputText, {
      props: {
        labelName: "Nome:",
        iputName: "nameInput",
        modelValue: "John Doe",
      },
    });

    expect(wrapper.text()).toContain("Nome:");

    const inputElement = wrapper.find("input");
    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes("id")).toBe("nameInput");
    expect(inputElement.attributes("type")).toBe("text");
    expect(inputElement.attributes("name")).toBe("nameInput");
    expect(inputElement.attributes("value")).toBe("John Doe");

    // Simula a entrada de dados no campo
    await inputElement.setValue("Jane Doe");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["Jane Doe"]);
  });

  it("emite o evento blurEvent quando o campo perde o foco", async () => {
    const wrapper = mount(InputText, {
      props: {
        labelName: "Nome:",
        iputName: "nameInput",
        modelValue: "John Doe",
      },
    });

    // Simula o evento de perda de foco
    await wrapper.find("input").trigger("blur");

    expect(wrapper.emitted().blurEvent).toBeTruthy();
    expect(wrapper.emitted().blurEvent[0]).toEqual(["John Doe"]);
  });
});
