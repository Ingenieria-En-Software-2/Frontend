import unittest
import os
from selenium import webdriver
from users_page import UsersPage
from roles_page import RolesPage
from menu_page import MenuPage
import tracemalloc
tracemalloc.start()


class TestTableFunctionality(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__)) # Find the path to chromedriver
        self.driver = webdriver.Chrome(executable_path=os.path.join(path, 'chromedriver')) # Set up Selenium WebDriver and navigate to the web page

    def test_users_data_extraction(self):
        self.driver.get("http://localhost:5173/users")
        users_page = UsersPage(self.driver)
        users_data = users_page.get_users_data()

        expected_data = [
            ["admin", "Admin", "One", "Analista de Cuentas", "Interno", ""],
            ["user", "User", "Two", "Analista de Cuentas", "Externo", ""],
            ["user2", "User", "Three", "Cuentahabiente", "Mixto", ""],
            ["user3", "User", "Four", "Analista de Cuentas", "Interno", ""],
            ["user4", "User", "Five", "Cuentahabiente", "Externo", ""],
        ]

        self.assertEqual(users_data, expected_data)

    def test_roles_data_extraction(self):
        self.driver.get("http://localhost:5173/roles/")  # URL de la página de roles
        roles_page = RolesPage(self.driver)
        roles_data = roles_page.get_roles_data()

        expected_data = [
            ["1", "Gerente General", ""],
            ["2", "Gerente de Operaciones", ""],
            ["3", "Sub-Gerente de Cuentas", ""],
            ["4", "Analista de Cuentas", ""],
            ["5", "Administrador de Sistemas", ""],
            ["6", "Cuentahabiente", ""],
        ]

        self.assertEqual(roles_data, expected_data)

    def tearDown(self):
        self.driver.quit()

class TestMenuFunctionality(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__)) # Find the path to chromedriver
        self.driver = webdriver.Chrome(executable_path=os.path.join(path, 'chromedriver')) # Set up Selenium WebDriver and navigate to the web page
        self.driver.get("http://localhost:5173")  # Cambia la URL según tu entorno de prueba

    def test_menu_navigation(self):
        menu_page = MenuPage(self.driver)

        menu_page.click_hamburger_button()
        menu_page.click_menu_item(2)
        self.assertEqual(menu_page.get_current_url(), "http://localhost:5173/users")
        menu_page.click_back()

        # menu_page.click_hamburger_button()
        menu_page.click_menu_item(3)
        self.assertEqual(menu_page.get_current_url(), "http://localhost:5173/roles")
        menu_page.click_back()

    def tearDown(self):
        self.driver.quit()

class TestEditRolesDeUsuarios(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__)) # Find the path to chromedriver
        self.driver = webdriver.Chrome(executable_path=os.path.join(path, 'chromedriver')) # Set up Selenium WebDriver and navigate to the web page

    def test_roles_data_extraction(self):
        self.driver.get("http://localhost:5173/roles/")  # URL de la página de roles
        roles_page = RolesPage(self.driver)
        description_roles = roles_page.get_roles_description()
        
        expected_data = [
            "Gerente General",
            "Gerente de Operaciones",
            "Sub-Gerente de Cuentas",
            "Analista de Cuentas",
            "Administrador de Sistemas",
            "Cuentahabiente",
        ]

        self.assertEqual(description_roles, expected_data)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
