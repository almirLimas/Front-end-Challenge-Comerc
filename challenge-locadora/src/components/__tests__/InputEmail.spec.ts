import { mount } from "@vue/test-utils";
import InputEmail from "@/components/InputEmail.vue";

describe("MyInputField", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(InputEmail, {
      props: {
        labelName: "Email:",
        iputName: "emailInput",
        modelValue: "john@example.com",
      },
    });

    expect(wrapper.text()).toContain("Email:");

    // Verifica se o campo de entrada está renderizado corretamente
    const inputElement = wrapper.find("input");
    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes("id")).toBe("emailInput");
    expect(inputElement.attributes("type")).toBe("email");
    expect(inputElement.attributes("value")).toBe("john@example.com");

    // Simula a entrada de dados no campo
    await inputElement.setValue("new@example.com");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
      "new@example.com",
    ]);
  });
});
