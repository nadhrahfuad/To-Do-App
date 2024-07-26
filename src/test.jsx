app.patch("/:role/:id/manage/:bookingid", async (req, res) => {
    const { role, action } = req.params;
    const {
      appointment_id,
      vet_name,
      day_of_week,
      start_time,
      end_time,
      owner_name,
      pet_name,
      reason,
      status,
    } = req.body;
  
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      let queryResult;
  
      if (role === "petowner") {
        queryResult = await client.query(
          `UPDATE appointments 
           SET vet_name = $1, 
               day_of_week = $2, 
               start_time = $3, 
               end_time = $4, 
               owner_name = $5, 
               pet_name = $6, 
               reason = $7, 
               status = $8 
           WHERE appointment_id = $9`,
          [
            vet_name,
            day_of_week,
            start_time,
            end_time,
            owner_name,
            pet_name,
            reason,
            status,
            appointment_id,
          ],
        );
      } else if (role === "petowner") {
        queryResult = await client.query(
          `UPDATE appointments 
           SET removed = $1 ,
               status = $2
           WHERE appointment_id = $3`,
          [true, "cancelled", appointment_id],
        );
      } else if (role === "vet" || role === "admin") {
        if (action === "edit") {
          queryResult = await client.query(
            `UPDATE appointments 
             SET vet_name = $1, 
                 day_of_week = $2, 
                 start_time = $3, 
                 end_time = $4, 
                 owner_name = $5, 
                 pet_name = $6, 
                 reason = $7, 
                 status = $8 
             WHERE appointment_id = $9`,
            [
              vet_name,
              day_of_week,
              start_time,
              end_time,
              owner_name,
              pet_name,
              reason,
              status,
              appointment_id,
            ],
          );
        } else {
          throw new Error("Invalid action for vet/admin");
        }
      } else {
        throw new Error("Unauthorized");
      }
  
      if (queryResult.rowCount > 0) {
        await client.query("COMMIT");
        res.status(200).json({ message: "Appointment updated successfully" });
      } else {
        throw new Error("No rows affected");
      }
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error updating appointment:", error.message);
      let statusCode = 500;
      if (error.message === "Unauthorized") {
        statusCode = 403;
      }
      res.status(statusCode).json({ error: error.message });
    } finally {
      client.release();
    }
  });