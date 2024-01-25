import { mount } from "@vue/test-utils";
import InputPassword from "@/components/InputPassword.vue";

describe("MyPasswordInput", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(InputPassword, {
      props: {
        labelName: "Senha:",
        iputName: "passwordInput",
        modelValue: "password123",
      },
    });

    expect(wrapper.text()).toContain("Senha:");

    // Verifica se o campo de senha está renderizado corretamente
    const inputElement = wrapper.find("input");
    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes("id")).toBe("passwordInput");
    expect(inputElement.attributes("type")).toBe("password");
    expect(inputElement.attributes("name")).toBe("passwordInput");
    expect(inputElement.attributes("value")).toBe("password123");
    expect(inputElement.attributes("maxlength")).toBe("8");

    await inputElement.setValue("newpassword");

    // Verifica se o evento input foi emitido corretamente
    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["newpassword"]);
  });
});
