import { mount } from "@vue/test-utils";
import CardMovie from "@/components/CardMovie.vue";
import { nextTick } from "vue";

describe("MyMovieCard", () => {
  it("renderiza corretamente com as props fornecidas", async () => {
    const wrapper = mount(CardMovie, {
      props: {
        title: "Teste Filme",
        year: "2022",
        client: "Paulo",
        isDelivered: false,
        isLocation: false,
        dateLocation: "25/01/2024",
        dateDelivered: "26/01/2024",
      },
      global: {
        provide: {
          $swal: {
            fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Teste Filme");
    expect(wrapper.text()).toContain("2022");
    expect(wrapper.text()).toContain("Paulo");

    await wrapper.find("button.bg-cyan-500").trigger("click");

    expect(wrapper.emitted().clickLocation).toBeTruthy();

    await wrapper.find("button.bg-cyan-500").trigger("click");

    await nextTick();
  });
});
