import { mount } from "@vue/test-utils";
import ButtonBack from "@/components/ButtonBack.vue";

describe("MyComponent", () => {
  it("deve chamar a função back ao clicar no botão", async () => {
    const wrapper = mount(ButtonBack, {
      props: {
        routerBack: "/pagina-anterior",
      },
    });

    const mockRouterPush = jest.fn();
    const mockRouter = {
      push: mockRouterPush,
    };

    jest.mock("vue-router", () => ({
      useRouter: () => mockRouter,
    }));

    await wrapper.find("button").trigger("click");

    // Verifica se a função back foi chamada
    expect(mockRouterPush).toHaveBeenCalledWith({ path: "/pagina-anterior" });
  });

  it("deve renderizar corretamente", () => {
    const wrapper = mount(ButtonBack, {
      props: {
        routerBack: "/pagina-anterior",
      },
    });

    // Verifica se o componente é renderizado corretamente
    expect(wrapper.exists()).toBe(true);
  });
});
