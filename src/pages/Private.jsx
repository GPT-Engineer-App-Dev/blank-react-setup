import { Container, Text, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Private = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue_id: "", is_starred: false });
  const [editingEvent, setEditingEvent] = useState(null);
  const toast = useToast();
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      setNewEvent({ name: "", date: "", venue_id: "", is_starred: false });
      toast({ title: "Event added.", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Error adding event.", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent.mutateAsync(editingEvent);
      setEditingEvent(null);
      toast({ title: "Event updated.", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Error updating event.", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: "Event deleted.", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Error deleting event.", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Protected Page</Text>
        <Text>This page is only accessible to authenticated users.</Text>
        <Button onClick={logout}>Logout</Button>
        <FormControl id="name">
          <FormLabel>Event Name</FormLabel>
          <Input type="text" name="name" value={newEvent.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="date">
          <FormLabel>Event Date</FormLabel>
          <Input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="venue_id">
          <FormLabel>Venue ID</FormLabel>
          <Input type="number" name="venue_id" value={newEvent.venue_id} onChange={handleInputChange} />
        </FormControl>
        <Button onClick={handleAddEvent}>Add Event</Button>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading events.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Venue ID</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.venue_id}</Td>
                  <Td>
                    <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                    <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {editingEvent && (
          <VStack spacing={4}>
            <FormControl id="edit-name">
              <FormLabel>Edit Event Name</FormLabel>
              <Input type="text" name="name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
            </FormControl>
            <FormControl id="edit-date">
              <FormLabel>Edit Event Date</FormLabel>
              <Input type="date" name="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
            </FormControl>
            <FormControl id="edit-venue_id">
              <FormLabel>Edit Venue ID</FormLabel>
              <Input type="number" name="venue_id" value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })} />
            </FormControl>
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Private;