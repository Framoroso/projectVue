<template>
  <div class="hello">
    <input type="text" v-model="uneAutreVar">
    <button v-on:click="addToList">Ajouter</button>
    <label>Filtre
      <input v-model="query">
    </label>
    <h1 v-if="on">
      {{ message }}
    </h1>
  
    <h1 v-show="on">
      {{ uneAutreVar }}
    </h1>
    <ul>
      <li v-for="(person, index) in defaultList" v-bind:key="index" v-bind:style="{color: person.color}" v-bind:class="{red: index === 1}">
        #{{ index + 1 }} {{ person.name }}
  
        <img v-bind:src="person | toAvatars">
        <button v-on:click="remove(person)">Supprimer</button>
      </li>
    </ul>
    <ul>
      <li v-for="(person, index) in listFiltre" v-bind:key="index" v-bind:style="{color: person.color}" v-bind:class="{red: index === 1}">
        #{{ index + 1 }} {{ person.name }}
  
        <img v-bind:src="person | toAvatars">
        <button v-on:click="remove(person)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>

const LOCALSTORAGE_KEY = 'vuedemo-malist';

export default {
    name: 'hello',
    data() {
        let maList;
        try {
            maList = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            if (!maList) {
                throw new Error();
            }
        } catch (e) {
            maList = [
                {
                    name: 'Bibi',
                    color: '#FF00FF'
                },
                {
                    name: 'Moulin',
                    color: '#00FF00'
                },
                {
                    name: 'Babe',
                    color: '#0000FF'
                }
            ];
        }
        return {
            on: true,
            query: '',
            uneAutreVar: 'Bibi',
            message: 'Hello vue.js',
            maList
        };
    },
    filters: {
        toAvatars(person) {
            return `https://robohash.org/${person.name}`;
        }
    },
    methods: {
        addToList() {
            const person = {
                name: this.uneAutreVar,
                color: this.color
            };
            this.maList.push(person);
        },
        remove(person) {
            let index = this.maList.indexOf(person);
            this.maList.splice(index, 1);
        }
    },
    computed: {
        listFiltre() {
            return this.maList.filter(person => {
                return person.name.toLowerCase().indexOf(this.query.toLowerCase()) === 0;
            });
        }
    },
    watch: {
        maList: {
            handler: function (val, oldval) {
                console.log('qqch a changé');
                const listJson = JSON.stringify(this.maList);
                localStorage.setItem(LOCALSTORAGE_KEY, listJson);
            },
            deep: true
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red {
  background-color: rosybrown;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
