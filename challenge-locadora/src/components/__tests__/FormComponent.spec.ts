import { mount } from "@vue/test-utils";
import FormComponent from "@/components/FormComponent.vue";

describe("MyForm", () => {
  it("renderiza corretamente", async () => {
    const wrapper = mount(FormComponent);

    expect(wrapper.text()).toContain("Nome:");
    expect(wrapper.text()).toContain("Email:");
    expect(wrapper.text()).toContain("Mensagem:");

    // Simula a entrada de dados nos campos
    await wrapper.find("input#nome").setValue("John Doe");
    await wrapper.find("input#email").setValue("john@example.com");
    await wrapper.find("textarea#mensagem").setValue("Mensagem de teste");

    // Verifica se os campos foram preenchidos corretamente
    //@ts-ignore
    expect(wrapper.find("input#nome").element.value).toBe("John Doe");
    //@ts-ignore
    expect(wrapper.find("input#email").element.value).toBe("john@example.com");
    //@ts-ignore
    expect(wrapper.find("textarea#mensagem").element.value).toBe(
      "Mensagem de teste"
    );
  });

  it("emite o evento submit quando o formulário é enviado", async () => {
    const wrapper = mount(FormComponent);

    await wrapper.find("input#nome").setValue("John Doe");
    await wrapper.find("input#email").setValue("john@example.com");
    await wrapper.find("textarea#mensagem").setValue("Mensagem de teste");

    await wrapper.find("form").trigger("submit");

    // Verifica se o evento submit foi emitido
    expect(wrapper.emitted().submit).toBeTruthy();

    // Verifica se os dados do formulário foram emitidos corretamente
    //@ts-ignore
    expect(wrapper.emitted().submit[0][0]).toEqual({
      nome: "John Doe",
      email: "john@example.com",
      mensagem: "Mensagem de teste",
    });
  });
});
