class uRender {
    constructor({ containerId, apiUrl = null, data = null, renderTemplate }) {
        this.container = document.getElementById(containerId);
        this.apiUrl = apiUrl;
        this.data = data;
        this.renderTemplate = renderTemplate;
        this.state = { data: null };
        this.prevHTML = "";

        this.render();
        this.componentDidMount();
    }

    componentDidMount() {
        if (this.apiUrl) {
            this.fetchData();
        } else if (this.data) {
            this.setState({ data: this.data });
        }
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            this.setState({ data });
        } catch (error) {
            console.error("error:", error);
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateDOM();
    }

    renderHTML() {
        return this.renderTemplate(this.state.data);
    }

    updateDOM() {
        const newHTML = this.renderHTML();
        if (newHTML !== this.prevHTML) {
            this.container.innerHTML = newHTML;
            this.prevHTML = newHTML;
        }
    }

    render() {
        this.prevHTML = this.renderHTML();
        this.container.innerHTML = this.prevHTML;
    }
}


const render = new uRender({
    containerId: "uRender-container",
    apiUrl: "https://jsonplaceholder.typicode.com/users",
    renderTemplate: (data) => `
    <ul role="list" class="divide-y divide-gray-100">
     ${data
            ? data.map(user => `
                    <li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <img class="size-12 flex-none rounded-full bg-gray-50" src="https://placehold.co/100@2x.png" alt="">
      <div class="min-w-0 flex-auto">
        <p class="text-sm/6 font-semibold text-gray-900">${user.name}</p>
        <p class="mt-1 truncate text-xs/5 text-gray-500">${user.email}</p>
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p class="text-sm/6 text-gray-900">${user.company.name}</p>
      <p class="mt-1 text-xs/5 text-gray-500">${user.phone}</p>
    </div>
  </li>
  `).join('')
            : `
            <li class="flex justify-between gap-x-6 py-5 animate-pulse">
    <div class="flex min-w-0 gap-x-4">
      <div class="w-12 h-12 flex-none rounded-full bg-gray-200"></div>
      <div class="min-w-0 flex-auto">
        <div class="h-4 bg-gray-200 rounded w-24 mb-1"></div>
        <div class="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <div class="h-4 bg-gray-200 rounded w-20 mb-1"></div>
      <div class="h-3 bg-gray-200 rounded w-28"></div>
    </div>
</li>
            `
        }
</ul>
    `
});