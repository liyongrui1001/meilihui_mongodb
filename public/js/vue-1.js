let vm = new Vue({
    el: "#app",
    data: {

    },
    methods: {
        getIndex() {
            this.$http({
                url: "/vue",
                method: "get"
            }).then((res) => {
                console.log(res)
            }, (res) => {
                console.log(res)
            })
        }
    },
    mounted() {
        this.getIndex();
    }
})