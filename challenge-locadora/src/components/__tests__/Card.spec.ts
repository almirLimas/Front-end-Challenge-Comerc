import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";
import "@types/jest";

describe("MyCard", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(Card, {
      props: {
        titleCard: "Teste de Título",
        iconCard: "fa-solid fa-user",
      },
    });

    expect(wrapper.find(".text-gray-600").text()).toBe("Teste de Título");

    // Verifica se o ícone foi renderizado corretamente
    expect(wrapper.find(".text-cyan-400").classes("fa")).toBe(true);

    // Pode adicionar mais verificações conforme necessário
  });

  it("emite o evento clickCard quando clicado", async () => {
    const wrapper = mount(Card, {
      props: {
        titleCard: "Teste de Título",
        iconCard: "fa-solid fa-user",
      },
    });

    // Simula o clique no card
    await wrapper.trigger("click");

    // Verifica se o evento clickCard foi emitido
    expect(wrapper.emitted().clickCard).toBeTruthy();
  });
});
