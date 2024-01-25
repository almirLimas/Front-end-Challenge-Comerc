import { mount } from "@vue/test-utils";
import SelectComponent from "@/components/SelectComponent.vue";

describe("MySelectInput", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        title: "Status:",
        modelValue: "ativo",
      },
    });

    expect(wrapper.text()).toContain("Status:");

    const selectElement = wrapper.find("select");
    expect(selectElement.exists()).toBe(true);
    expect(selectElement.attributes("value")).toBe("ativo");

    const options = wrapper.findAll("option");
    expect(options.length).toBe(2);
    expect(options[0].text()).toBe("Ativo");
    expect(options[0].attributes("value")).toBe("ativo");
    expect(options[0].attributes("selected")).toBeTruthy();
    expect(options[1].text()).toBe("Desativado");
    expect(options[1].attributes("value")).toBe("desativado");
    expect(options[1].attributes("selected")).toBeFalsy();

    await selectElement.setValue("desativado");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["desativado"]);
  });
});
